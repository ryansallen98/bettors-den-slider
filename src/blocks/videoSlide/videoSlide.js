import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import wpEditorVideoSlide from './wpEditorVideoSlide';

registerBlockType("bettors-den-slider/video-slide", {
    title: "Bettors Den Video Slide",
    category: 'bettors-den-slider',
    icon: 'slides',
    supports: {
        align: ["full"]
    },
    attributes: {
        align: { type: "string", default: "full" },
        videoID: { type: "number" },
        videoURL: { type: "string" },
        desktopPosition: { type: "string", default: "center" },
        tabletPosition: { type: "string", default: "center" },
        mobilePosition: { type: "string", default: "center" },
    },
    edit: wpEditorVideoSlide,
    save: () => <InnerBlocks.Content />
});