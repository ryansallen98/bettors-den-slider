import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import wpEditorSlide from './wpEditorSlide';

registerBlockType("bettors-den-slider/slide", {
    title: "Bettors Den Slide",
    category: 'bettors-den-slider',
    icon: 'slides',
    supports: {
        align: ["full"]
    },
    attributes: {
        align: { type: "string", default: "full" },
        imageID: { type: "number" },
        imageURL: { type: "string" },
        imageAlt: { type: "string" },
        desktopPosition: { type: "string", default: "center" },
        tabletPosition: { type: "string", default: "center" },
        mobilePosition: { type: "string", default: "center" },
    },
    edit: wpEditorSlide,
    save: () => <InnerBlocks.Content />
});