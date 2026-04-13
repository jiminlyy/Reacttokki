import GlassPanel from "../../components/GlassPanel";
import TopTabs from "../../components/TopTabs";
import backgroundImg from "../../assets/background.png";
import { useState, useMemo } from "react";
import { useTask } from "../Daily/context/useTask";
import rabbit1 from "../../assets/rabbit1.png";
import rabbit2 from "../../assets/rabbit2.png";
import rabbit3 from "../../assets/rabbit3.png";
import rabbit4 from "../../assets/rabbit4.png";
import rabbit5 from "../../assets/rabbit5.png";

const RABBIT_IMAGES = {
  0: rabbit1,
  25: rabbit2,
  50: rabbit3,
  75: rabbit4,
  100: rabbit5,
};

const MESSAGES = {
  0: "오늘 시작해야죠!",
  25: "시작이 반이에요!",
  50: "절반 왔어요! 파이팅!",
  75: "거의 다 왔어요! 조금만 더!",
  100: "완벽해요! 수고했어요🥕",
};

// 오늘 날짜 (4월 기준)
const TODAY = new Date().getDate(); // 13

function getCircleColor(percent) {
  if (percent === 0) return "#EAEAEA";
  if (percent <= 25) return "#FBF6FD";
  if (percent <= 50) return "#F6EAFC";
  if (percent <= 75) return "#E2DFFD";
  return "#CFD9F9";
}

function getRabbitImage(percent) {
  if (percent >= 100) return RABBIT_IMAGES[100];
  if (percent >= 75) return RABBIT_IMAGES[75];
  if (percent >= 50) return RABBIT_IMAGES[50];
  if (percent >= 25) return RABBIT_IMAGES[25];
  return RABBIT_IMAGES[0];
}

function getMessage(percent) {
  if (percent >= 100) return MESSAGES[100];
  if (percent >= 75) return MESSAGES[75];
  if (percent >= 50) return MESSAGES[50];
  if (percent >= 25) return MESSAGES[25];
  return MESSAGES[0];
}

function generateApril2026() {
  const startDay = 3;
  const totalDays = 30;
  const cells = [];
  for (let i = 0; i < startDay; i++) {
    cells.push({ day: null, key: `empty-${i}` });
  }
  for (let d = 1; d <= totalDays; d++) {
    cells.push({ day: d, key: `day-${d}` });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: null, key: `empty-end-${cells.length}` });
  }
  return cells;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function Process() {
  const { todayPercent } = useTask();

  // 날짜별 달성률 저장 (오늘은 todayPercent로 덮어씌움)
  const [dayProgress, setDayProgress] = useState(() => {
    const init = {};
    for (let d = 1; d <= 30; d++) {
      init[d] = 0;
    }
    return init;
  });

  // 선택된 날짜 (기본값: 오늘)
  const [selectedDay, setSelectedDay] = useState(TODAY);

  // 오늘 날짜는 항상 todayPercent로 계산
  const getPercent = (day) => {
    if (day === TODAY) return todayPercent;
    return dayProgress[day] ?? 0;
  };

  const handleDayClick = (day) => {
    if (!day) return;
    setSelectedDay(day);
    // 오늘이 아닌 날짜는 클릭 시 순환
    if (day !== TODAY) {
      setDayProgress((prev) => {
        const current = prev[day];
        const next = current >= 100 ? 0 : current + 25;
        return { ...prev, [day]: next };
      });
    }
  };

  const selectedPercent = getPercent(selectedDay);

  // 전체 달성률: 모든 날짜 평균
  const overallPercent = useMemo(() => {
    let sum = 0;
    for (let d = 1; d <= 30; d++) {
      sum += getPercent(d);
    }
    return Math.round(sum / 30);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayProgress, todayPercent]);

  const calendarCells = useMemo(() => generateApril2026(), []);
  const rabbitImg = getRabbitImage(selectedPercent);
  const message = getMessage(selectedPercent);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <TopTabs />
      <GlassPanel>
        <div style={styles.wrapper}>
          {/* ══════ 왼쪽: Process 카드 ══════ */}
          <div style={styles.leftPanel}>
            <div style={styles.titleBadge}>Process</div>
            <div style={styles.rabbitBox}>
              <img
                src={rabbitImg}
                alt={`토끼 ${selectedPercent}%`}
                style={styles.rabbitImg}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div style={{ ...styles.fallbackText, display: "none" }}>
                🐰
              </div>
            </div>
            <div style={styles.messageBox}>{message}</div>
            <div style={styles.percentText}>{selectedPercent}%</div>
            <div style={styles.selectedDayLabel}>
              4월 {selectedDay}일
              {selectedDay === TODAY && " (오늘)"}
            </div>
            <div style={styles.overallLabel}>전체 평균: {overallPercent}%</div>
          </div>

          {/* ══════ 오른쪽: 캘린더 ══════ */}
          <div style={styles.rightPanel}>
            <div style={styles.monthTitle}>4</div>
            <div style={styles.yearSubtitle}>2026</div>
            <div style={styles.weekdayRow}>
              {WEEKDAYS.map((wd) => (
                <div key={wd} style={styles.weekdayCell}>{wd}</div>
              ))}
            </div>
            <div style={styles.calendarGrid}>
              {calendarCells.map((cell) => {
                const percent = cell.day ? getPercent(cell.day) : 0;
                const isSelected = cell.day === selectedDay;
                const isToday = cell.day === TODAY;
                return (
                  <div
                    key={cell.key}
                    style={{
                      ...styles.dayCircle,
                      backgroundColor: cell.day
                        ? getCircleColor(percent)
                        : "transparent",
                      cursor: cell.day ? "pointer" : "default",
                      outline: isSelected ? "2px solid #a990d8" : "none",
                      outlineOffset: "2px",
                      boxShadow: isToday
                        ? "0 0 0 2px #f0a8c8"
                        : percent >= 100
                        ? "0 0 12px rgba(108, 92, 231, 0.5)"
                        : "none",
                    }}
                    onClick={() => handleDayClick(cell.day)}
                    title={
                      cell.day
                        ? `4월 ${cell.day}일 - ${percent}%${cell.day === TODAY ? " (오늘, Daily에서 자동 연동)" : " (클릭하여 변경)"}`
                        : ""
                    }
                  >
                    {cell.day && (
                      <span
                        style={{
                          ...styles.dayNumber,
                          color: percent >= 75 ? "#fff" : "#4a4a6a",
                        }}
                      >
                        {cell.day}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={styles.legend}>
              {[
                { label: "0%", color: "#EAEAEA" },
                { label: "25%", color: "#FBF6FD" },
                { label: "50%", color: "#F6EAFC" },
                { label: "75%", color: "#E2DFFD" },
                { label: "100%", color: "#CFD9F9" },
              ].map((item) => (
                <div key={item.label} style={styles.legendItem}>
                  <div style={{ ...styles.legendDot, backgroundColor: item.color }} />
                  <span style={styles.legendLabel}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    gap: "2rem",
    width: "100%",
  },
  leftPanel: {
    flex: "0 0 360px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.75rem",
  },
  titleBadge: {
    background: "rgba(200, 180, 240, 0.4)",
    borderRadius: "20px",
    padding: "0.4rem 1.5rem",
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#4a4a6a",
    letterSpacing: "0.5px",
  },
  rabbitBox: {
    width: "320px",
    height: "360px",
    background: "rgba(255, 220, 240, 0.4)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.5)",
  },
  rabbitImg: {
    maxWidth: "90%",
    maxHeight: "90%",
    objectFit: "contain",
  },
  fallbackText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    color: "#8a7ab0",
    textAlign: "center",
    lineHeight: 1.4,
  },
  messageBox: {
    background: "rgba(255, 200, 220, 0.5)",
    borderRadius: "12px",
    padding: "0.5rem 1.2rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#5a4a6a",
    textAlign: "center",
    width: "100%",
  },
  percentText: {
    fontSize: "3.5rem",
    fontWeight: "800",
    color: "#5a4a6a",
    lineHeight: 1,
  },
  selectedDayLabel: {
    fontSize: "0.9rem",
    color: "#8a7ab0",
    fontWeight: "600",
  },
  overallLabel: {
    fontSize: "0.85rem",
    color: "#a090c0",
    fontWeight: "500",
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  monthTitle: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#4a4a6a",
    lineHeight: 1,
  },
  yearSubtitle: {
    fontSize: "1rem",
    color: "#8a7ab0",
    marginBottom: "0.75rem",
    fontWeight: "600",
  },
  weekdayRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "6px",
    width: "100%",
    marginBottom: "4px",
  },
  weekdayCell: {
    textAlign: "center",
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "#8a7ab0",
    padding: "4px 0",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "6px",
    width: "100%",
  },
  dayCircle: {
    aspectRatio: "1",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s ease",
    minWidth: "36px",
  },
  dayNumber: {
    fontSize: "1.1rem",
    fontWeight: "700",
    userSelect: "none",
  },
  legend: {
    display: "flex",
    gap: "12px",
    marginTop: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  legendDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    border: "1px solid rgba(200,180,220,0.5)",
  },
  legendLabel: {
    fontSize: "0.7rem",
    color: "#6a5a8a",
    fontWeight: "600",
  },
};
