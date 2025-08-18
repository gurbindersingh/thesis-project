export const chartData = new Array(7)
  .fill(0)
  .map((_, i) => ({
    energyMax: Math.round(Math.random() * 12) + 8,
    work: i < 5 ? 1 : 0,
    grocery: Math.round(Math.random() * 1),
    shower: Math.round(Math.random() * 1.5),
    makeDinner: Math.round(Math.random() * 1.5),
    cleanUp: Math.round(Math.random() * 1.5),
    ldn: i < 6 ? 1 : 0,
    h1i: i < 6 ? 1 : 0,
    painMed: Math.round(Math.random() * 1),
    vitB: Math.round(Math.random() * 1),
    brainFog: Math.round(Math.random() * 4) + 1,
    neckPain: Math.round(Math.random() * 5),
    heartBurn: Math.round(Math.random() * 5),
    totalCost: Math.round(Math.random() * 6) + i < 5 ? 8 : 2,
    sleep: Math.round(Math.random() * 3) + 1,
  }))
  .map((d) => {
    const data = { ...d };
    let cost = 0;
    cost += data.work === 1 ? 8 : 0;
    cost += data.grocery === 1 ? 4 : 0;
    cost += data.shower === 1 ? 1 : 0;
    cost += data.makeDinner === 1 ? 2 : 0;
    cost += data.cleanUp === 1 ? 1 : 0;
    cost += data.sleep < 3 ? 1 : 0;
    cost += data.sleep < 2 ? 2 : 0;
    cost -= data.ldn === 1 ? 1 : 0;
    cost -= data.vitB === 1 ? 1 : 0;

    const brainFog = Math.max(
      0,
      Math.min(data.ldn ? data.brainFog - 2 : data.brainFog),
    );
    const heartBurn = Math.max(
      0,
      Math.min(data.painMed ? data.heartBurn + 2 : data.heartBurn),
    );

    return {
      ...data,
      energyMin: data.energyMax - cost,
      totalCost: cost,
      brainFog,
      heartBurn,
    };
  })
  .map((d) => ({
    ...d,
    energyAvg: (d.energyMax + d.energyMin) / 2,
  }));
