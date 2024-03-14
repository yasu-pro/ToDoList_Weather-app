interface DayLabel {
    label: string;
    isSaturday: boolean;
    isSunday: boolean;
}

// 日付の判定
const getDayLabel = (date: Date): DayLabel => {
    const currentDate = new Date();
    const targetDate = new Date(date);

    const isSaturday = targetDate.getDay() === 6; // 土曜日
    const isSunday = targetDate.getDay() === 0; // 日曜日

    let label = "";
    if (targetDate.getDate() === currentDate.getDate()) {
        label = targetDate.getHours() < 24 ? "今日" : "明日";
    } else if (targetDate.getDate() === currentDate.getDate() + 1) {
        label = "明日";
    } else if (targetDate.getDate() === currentDate.getDate() + 2) {
        label = "明後日";
    }

    return { label, isSaturday, isSunday };
};

export default getDayLabel;
