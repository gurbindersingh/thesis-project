export const chartData = new Array(7)
  .fill(0)
  .map((_, i) => ({
    energyMax: Math.round(Math.random() * 8) + 8,
    energyMin: Math.round(Math.random() * 4),
    work: i < 5 ? 1 : 0,
    grocery: Math.round(Math.random() * 1),
    shower: Math.round(Math.random() * 1.5),
    makeDinner: Math.round(Math.random() * 1.5),
    cleanUp: Math.round(Math.random() * 1.5),
    ldn: i < 6 ? 1 : 0,
    h1i: i < 6 ? 1 : 0,
    painMed: Math.round(Math.random() * 1),
    brainFog: Math.round(Math.random() * 1),
    neckPain: Math.round(Math.random() * 1),
    heartBurn: Math.round(Math.random() * 1),
    totalCost: Math.round(Math.random() * 6) + i < 5 ? 8 : 2,
  }))
  .map((d) => ({
    ...d,
    energyAvg: (d.energyMax + d.energyMin) / 2,
  }));
