import SkeletonFigureFourLines from "./SkeletonFigureFourLines"

export default function SkeletonRow({title, subtitle, figureWidth, figureHeight, lineWidths, lineHeights}) {
    
    return (
        <div className="flex flex-col items-start gap-4">
            <h3>{title}</h3>
            <h6 className="font-light text-[#394547]">{subtitle}</h6>
            <div className="flex gap-4 w-250">
                <SkeletonFigureFourLines figureHeight={figureHeight} figureWidth={figureWidth} lineHeights={lineHeights} lineWidths={lineWidths}/>
                <SkeletonFigureFourLines figureHeight={figureHeight} figureWidth={figureWidth} lineHeights={lineHeights} lineWidths={lineWidths}/>
                <SkeletonFigureFourLines figureHeight={figureHeight} figureWidth={figureWidth} lineHeights={lineHeights} lineWidths={lineWidths}/>
                <SkeletonFigureFourLines figureHeight={figureHeight} figureWidth={figureWidth} lineHeights={lineHeights} lineWidths={lineWidths}/>
            </div>
        </div>
    )
}