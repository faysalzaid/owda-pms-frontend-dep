import './css.css'

const ProgressBar = ({ percentage }) => {
    const strokeWidth = 10;
    const radius = 50 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
  
    const offset = circumference - (percentage / 100) * circumference;
  
    return (
      <svg className="progress-bar" width="120" height="120">
        <circle
          className="progress-bar-background"
          strokeWidth={strokeWidth}
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          className="progress-bar-progress"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={radius}
          cx="60"
          cy="60"
        />
        <text className="progress-bar-text" x="50%" y="50%">
          {percentage}%
        </text>
      </svg>
    );
  };
  
  export default ProgressBar;