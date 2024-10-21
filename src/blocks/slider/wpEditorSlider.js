import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';

export default function wpEditorSlider(props) {
    const { attributes, setAttributes } = props;

    return (
        <>
            <InspectorControls>
                <PanelBody title='Settings' initialOpen={true}>
                    <PanelRow>
                        <TextControl
                            value={attributes.transitionSpeed}
                            onChange={(value) => setAttributes({ transitionSpeed: parseInt(value, 10) })}
                            label="Transition Speed (ms)"
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            value={attributes.autoplaySpeed}
                            onChange={(value) => setAttributes({ autoplaySpeed: parseInt(value, 10) })}
                            label="Autoplay Speed (ms)"
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <div style={{ backgroundColor: '#fff' }}>
                <div style={{
                    backgroundColor: '#0B2153',
                    textAlign: 'center',
                    padding: '5px',
                    fontFamily: 'sans-serif',
                }}>
                    <h4 style={{ color: '#fff' }}>Bettors Den Slider</h4>
                </div>
                <div style={{ padding: '0px' }}>
                    <InnerBlocks
                        // allowedBlocks={['bettors-den-slider/slide']}
                        allowedBlocks={['bettors-den-slider/slide']}
                        template={[['bettors-den-slider/slide']]}
                        templateLock={false} // Ensures that the user can add multiple slides
                        renderAppender={InnerBlocks.ButtonBlockAppender}
                    />
                </div>
                <div style={{
                    backgroundColor: '#0B2153',
                    padding: '10px 20px',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '40px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}>
                    <span>Transition Speed: <strong>{attributes.transitionSpeed / 1000}</strong> seconds</span>
                    <span>Autoplay Speed: <strong>{attributes.autoplaySpeed / 1000}</strong> seconds</span>
                </div>
            </div>
        </>
    );
}