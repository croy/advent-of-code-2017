import * as _ from "lodash";

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

export const part1 = (particleData: string[]): number | undefined => {
  const particles = _.map(particleData, parseParticle);
  return _(particles)
  .sortBy([
    (p: IParticle) => Math.abs(p.x.acc) + Math.abs(p.y.acc) + Math.abs(p.z.acc),
    (p: IParticle) => Math.abs(p.x.vel) + Math.abs(p.y.vel) + Math.abs(p.z.vel),
    (p: IParticle) => p.x.pos + p.y.pos + p.z.pos,
  ])
  .get([0, "id"], 0);
};
