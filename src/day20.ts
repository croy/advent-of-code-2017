import * as _ from "lodash";
import { parse } from "path";

interface IAxis {
  pos: number;
  vel: number;
  acc: number;
}

interface IParticle {
  id: number;
  x: IAxis;
  y: IAxis;
  z: IAxis;
}

const parseParticle = (particleDatum: string, id: number): IParticle => {
  const fields = /p=<([ -]?\d+),([ -]?\d+),([ -]?\d+)>, v=<([ -]?\d+),([ -]?\d+),([ -]?\d+)>, a=<([ -]?\d+),([ -]?\d+),([ -]?\d+)>/.exec(particleDatum);
  
  if (!fields) {
    throw new Error(`regex did not match input ${particleDatum}`);
  }
  return {
    id,
    x: {
      acc: parseInt(fields[7], 10),
      pos: parseInt(fields[1], 10),
      vel: parseInt(fields[4], 10),
    },
    y: {
      acc: parseInt(fields[8], 10),
      pos: parseInt(fields[2], 10),
      vel: parseInt(fields[5], 10),
    },
    z: {
      acc: parseInt(fields[9], 10),
      pos: parseInt(fields[3], 10),
      vel: parseInt(fields[6], 10),
    },
  };
};

export const part1 = (particleData: string[]): number => {
  const particles = _.map(particleData, parseParticle);
  return _(particles)
  .sortBy([
    (p: IParticle) => Math.abs(p.x.acc) + Math.abs(p.y.acc) + Math.abs(p.z.acc),
    (p: IParticle) => Math.abs(p.x.vel) + Math.abs(p.y.vel) + Math.abs(p.z.vel),
    (p: IParticle) => p.x.pos + p.y.pos + p.z.pos,
  ])
  .get([0, "id"], 0);
};

const axisCollision = (axis1: IAxis, axis2: IAxis): number[] | "ALL" => {
  const a = (axis1.acc - axis2.acc) / 2;
  const b = axis1.vel - axis2.vel + a;
  const c = axis1.pos - axis2.pos;

  if (a === 0) {
    //linear
    if (b === 0) {
      if (c === 0) {
        return "ALL";
      }
      return [];
    }
    return [-c / b];
  } else {
    //quadratic
    const term = (b * b) - (4 * a * c);
    if (term < 0) {
      //imaginary solutions only
      return [];
    }
    return [(-b + Math.sqrt(term)) / (2 * a), (-b - Math.sqrt(term)) / (2 * a)];
  }
};

const collisionTime = (particle1: IParticle, particle2: IParticle): number | undefined => {
  const axisCollisionTimes = _([
    axisCollision(particle1.x, particle2.x),
    axisCollision(particle1.y, particle2.y),
    axisCollision(particle1.z, particle2.z),
  ])
  .filter((collisionTimes) => collisionTimes !== "ALL")
  .value() as number[][];

  if (_.isEmpty(axisCollisionTimes)) {
    // All axis collide all the time, so time 0 is the first collision
    return 0;
  }
  const particleCollisionTimes = _.intersection(...axisCollisionTimes);

  return _(particleCollisionTimes)
    .filter(_.isInteger)
    .filter((t) => t >= 0)
    .sort()
    .first();
};

export const part2 = (particleData: string[]): number => {
  const particles = _.map(particleData, parseParticle);
  const collisions: Array<{time: number, id1: number, id2: number}> = [];
  const destroyed: {[index: number]: number} = {};

  for (let i = 0; i < particles.length - 1; i++) {
    const particle1 = particles[i];

    for (let j = i + 1; j < particles.length; j++) {
      const particle2 = particles[j];
      const collision = collisionTime(particle1, particle2);

      if (!_.isUndefined(collision)) {
        collisions.push({id1: particle1.id, id2: particle2.id, time: collision});
      }
    }
  }

  _(collisions)
  .sortBy("time")
  .forEach((collision) => {
    if (destroyed[collision.id1] !== collision.time || destroyed[collision.id2] !== collision.time) {
      destroyed[collision.id1] = collision.time;
      destroyed[collision.id2] = collision.time;
    }
  });

  return particles.length - _.keys(destroyed).length;
};
