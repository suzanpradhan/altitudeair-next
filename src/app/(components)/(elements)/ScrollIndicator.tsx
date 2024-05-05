interface ScrollIndicatorProps {
  id: string;
}

export default function ScrollIndicator({ id }: ScrollIndicatorProps) {
  return (
    <a href={`#${id}`}>
      <div className="scroll_indi_container">
        <div className="top_arrow">
          <div className="left-indicator" />
          <div className="right-indicator" />
        </div>
      </div>
    </a>
  );
}
