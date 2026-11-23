import SkeletonBox from "./SkeletonBox";

export default function SkeletonFigureFourLines({figureWidth, figureHeight, lineWidths, lineHeights}) {
    
    return (
        <div className="flex gap-4 w-250">
            <div className="flex flex-col items-start px-3 pb-3 pt-8 rounded gap-2">    
                <SkeletonBox width={figureWidth} height={figureHeight} />
                <SkeletonBox height={lineHeights[0]} width={lineWidths[0]} />
                <SkeletonBox height={lineHeights[1]} width={lineWidths[1]} />
                <SkeletonBox height={lineHeights[2]} width={lineWidths[2]} />
                <SkeletonBox height={lineHeights[3]} width={lineWidths[3]} />
            </div>
        </div>
    )
}