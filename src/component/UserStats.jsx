import { useEffect, useState } from 'react';
import css from "../styles/UserStats.module.css";

const UserStats = () => {
    const [counts, setCounts] = useState({
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        total: 0
    });

    useEffect(() => {
        fetch('https://placify-backend.vercel.app/api/clicks/')
            .then(response => response.json())
            .then(data => setCounts(data));
    }, []);  

    return (
        <div className={css.userStatsContainer}>
            <div className={css.userStatsHeading}>User Statistics</div>
            <div className={css.userStatsCardSection}>
                <div className={`${css.userStatsCard}`}>
                    <div className={css.userCardTitle}>Today</div>
                    <div className={css.userCardValue}>{counts.today}</div>
                </div>
                <div className={css.userStatsCard}>
                    <div className={css.userCardTitle}>This Week</div>
                    <div className={css.userCardValue}>{counts.thisWeek}</div>
                </div>
                <div className={css.userStatsCard}>
                    <div className={css.userCardTitle}>This Month</div>
                    <div className={css.userCardValue}>{counts.thisMonth}</div>
                </div>
                <div className={css.userStatsCard}>
                    <div className={css.userCardTitle}>Total</div>
                    <div className={css.userCardValue}>{counts.total}</div>
                </div>
            </div>
        </div>
    );
}

export default UserStats;
