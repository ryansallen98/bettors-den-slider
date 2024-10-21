import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import wpEditorSlider from "./wpEditorSlider";

registerBlockType('bettors-den-slider/slider', {
    title: 'Bettors Den Slider',
    icon: 'slides',
    category: 'bettors-den-slider',
    icon: 'slides',
    supports: {
        align: ["full"]
    },
    attributes: {
        transitionSpeed: {
            type: "number",
            default: 2000
        },
        autoplaySpeed: {
            type: "number",
            default: 8000
        },
    },
    edit: wpEditorSlider,
    save: () => <InnerBlocks.Content />
});