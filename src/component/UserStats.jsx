import css from "../styles/UserStats.module.css";

const UserStats = () => {
    return (
        <div className={css.userStatsContainer}>
            <div className={css.userStatsHeading}>User Statistics</div>
            <div className={css.userStatsCardSection}>
                <div className={`${css.userStatsCard} ${css.active}`}>
                    <div className={css.userCardTitle}>Today</div>
                    <div className={css.userCardValue}>40</div>
                </div>
                <div className={css.userStatsCard}>
                    <div className={css.userCardTitle}>This Week</div>
                    <div className={css.userCardValue}>130</div>
                </div>
                <div className={css.userStatsCard}>
                    <div className={css.userCardTitle}>This Month</div>
                    <div className={css.userCardValue}>500</div>
                </div>
                <div className={css.userStatsCard}>
                    <div className={css.userCardTitle}>Total</div>
                    <div className={css.userCardValue}>1000</div>
                </div>
            </div>
        </div>
    )
}

export default UserStats