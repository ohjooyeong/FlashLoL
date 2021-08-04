function rankRateAdd(v) {
  if (v['wins'] === 0) {
    return 0;
  }

  let fixed =
    Math.round(v['wins'] / (v['wins'] + v['losses']) / 0.0001) * 0.001 * 10;
  fixed = parseFloat(fixed.toFixed(0));

  return fixed;
}

export { rankRateAdd };
