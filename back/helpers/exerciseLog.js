export const reBuildTimes = (log, prevExLog = null) => {
  return log.times.map((item, index) => ({
    ...item,
    prevWeight: prevExLog?.times[index]?.weight ?? 0,
    prevRepeat: prevExLog?.times[index]?.repeat ?? 0
  }));
};
