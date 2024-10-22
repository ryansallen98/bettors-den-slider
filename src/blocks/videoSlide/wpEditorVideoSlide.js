import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, PanelRow, Button, TextControl, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faTabletAlt, faMobileAlt, faArrowUp, faArrowDown, faArrowLeft, faArrowRight, faDotCircle } from '@fortawesome/free-solid-svg-icons';

const positionConfig = [
    { position: 'top-left', icon: faArrowUp, rotate: '-45deg' },
    { position: 'top', icon: faArrowUp },
    { position: 'top-right', icon: faArrowUp, rotate: '45deg' },
    { position: 'left', icon: faArrowLeft },
    { position: 'center', icon: faDotCircle },
    { position: 'right', icon: faArrowRight },
    { position: 'bottom-left', icon: faArrowDown, rotate: '45deg' },
    { position: 'bottom', icon: faArrowDown },
    { position: 'bottom-right', icon: faArrowDown, rotate: '-45deg' }
];

export default function wpEditorSlide(props) {
    const { attributes, setAttributes } = props;
    const [videoURL, setVideoURL] = useState(attributes.videoURL || '');
    const [videoAlt, setVideoAlt] = useState(attributes.videoAlt || '');
    const [viewport, setViewport] = useState('desktop');

    const onVideoSelect = (media) => {
        setVideoURL(media.url);
        setAttributes({
            videoID: media.id,
            videoURL: media.url,
            videoAlt: media.alt
        });
    };

    const onVideoURLChange = (url) => {
        setVideoURL(url);
    };

    const onVideoAltChange = (alt) => {
        setVideoAlt(alt);
    };

    const applyVideoURL = () => {
        setAttributes({ videoURL, videoAlt });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title='Background Video' initialOpen={true}>
                    {!attributes.videoURL ?
                        <>
                            <PanelRow>
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={onVideoSelect}
                                        value={attributes.videoID}
                                        allowedTypes={['video']}
                                        render={({ open }) => {
                                            return <Button variant='primary' onClick={open}>Media Library</Button>
                                        }}
                                    />
                                </MediaUploadCheck>
                            </PanelRow>
                            <div style={{ paddingBlock: '10px' }}>
                                or
                            </div>
                            <PanelRow>
                                <div>
                                    <TextControl
                                        label="Video URL"
                                        value={videoURL}
                                        onChange={onVideoURLChange}
                                        placeholder="Enter video URL"
                                        style={{ flex: '1' }}
                                    />
                                    <TextControl
                                        label="Video Alt"
                                        value={videoAlt}
                                        onChange={onVideoAltChange}
                                        placeholder="Enter video alt text"
                                        style={{ flex: '1' }}
                                    />
                                    <Button variant='secondary' onClick={applyVideoURL} style={{ marginTop: '-20px' }}>
                                        Apply External Video
                                    </Button>
                                </div>
                            </PanelRow>
                        </>
                        :
                        <PanelRow>
                            <div>
                                <video
                                    src={attributes.videoURL}
                                    alt=""
                                    style={{
                                        width: '100%',
                                        height: 'auto'
                                    }}
                                    controls
                                />
                                <Button variant='secondary' onClick={() => {
                                    setAttributes({ videoURL: '', videoID: 0 });
                                    setVideoURL('');
                                }}>Remove Video</Button>
                            </div>
                        </PanelRow>
                    }
                </PanelBody>
                <PanelBody title='Background Position' initialOpen={false}>
                    <PanelRow>
                        <ToolbarGroup>
                            <ToolbarButton
                                isPressed={viewport === 'desktop'}
                                onClick={() => setViewport('desktop')}
                            >
                                <FontAwesomeIcon icon={faDesktop} />
                            </ToolbarButton>
                            <ToolbarButton
                                isPressed={viewport === 'tablet'}
                                onClick={() => setViewport('tablet')}
                            >
                                <FontAwesomeIcon icon={faTabletAlt} />
                            </ToolbarButton>
                            <ToolbarButton
                                isPressed={viewport === 'mobile'}
                                onClick={() => setViewport('mobile')}
                            >
                                <FontAwesomeIcon icon={faMobileAlt} />
                            </ToolbarButton>
                        </ToolbarGroup>
                    </PanelRow>
                    <PanelRow>
                        <ToolbarGroup>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '2px'
                                }}
                            >
                                {positionConfig.map((config) => (
                                    <ToolbarButton
                                        isPressed={attributes[`${viewport}Position`] === config.position}
                                        onClick={() => setAttributes({ [`${viewport}Position`]: config.position })}
                                        size='compact'
                                    >
                                        <FontAwesomeIcon icon={config.icon} style={{ rotate: config.rotate }} />
                                    </ToolbarButton>
                                ))}
                            </div>
                        </ToolbarGroup>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <div className='bd-carousel__slide'>
                <div className='bd-carousel__image-wrapper'>
                    <video
                        src={attributes.videoURL}
                        alt={attributes.videoAlt}
                        className={`bd-carousel__image`}
                        data-bd-bg-position-desktop={`${attributes.desktopPosition}`} 
                        data-bd-bg-position-tablet={`${attributes.tabletPosition}`}
                        data-bd-bg-position-mobile={`${attributes.mobilePosition}`}
                        autoPlay
                        loop
                        muted
                    />
                    <div className='bd-carousel__cover'></div>
                </div>
                <div className='bd-carousel__container'>
                    <div className='bd-carousel__content'>
                        <div className='bd-carousel__cta'>
                            <InnerBlocks />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}