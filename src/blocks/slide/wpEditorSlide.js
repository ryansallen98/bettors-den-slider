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
    const [imageURL, setImageURL] = useState(attributes.imageURL || '');
    const [imageAlt, setImageAlt] = useState(attributes.imageAlt || '');
    const [viewport, setViewport] = useState('desktop');

    const onImageSelect = (media) => {
        const thumbnailURL = media.sizes.thumbnail ? media.sizes.thumbnail.url : media.url;
        setImageURL(thumbnailURL);
        setAttributes({
            imageID: media.id,
            imageURL: media.sizes.full.url,
            imageAlt: media.alt
        });
    };

    const onImageURLChange = (url) => {
        setImageURL(url);
    };

    const onImageAltChange = (alt) => {
        setImageAlt(alt);
    };

    const applyImageURL = () => {
        setAttributes({ imageURL, imageAlt });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title='Background Image' initialOpen={true}>
                    {!attributes.imageURL ?
                        <>
                            <PanelRow>
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={onImageSelect}
                                        value={attributes.imageID}
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
                                        label="Image URL"
                                        value={imageURL}
                                        onChange={onImageURLChange}
                                        placeholder="Enter image URL"
                                        style={{ flex: '1' }}
                                    />
                                    <TextControl
                                        label="Image Alt"
                                        value={imageAlt}
                                        onChange={onImageAltChange}
                                        placeholder="Enter image alt text"
                                        style={{ flex: '1' }}
                                    />
                                    <Button variant='secondary' onClick={applyImageURL} style={{ marginTop: '-20px' }}>
                                        Apply External Image
                                    </Button>
                                </div>
                            </PanelRow>
                        </>
                        :
                        <PanelRow>
                            <div>
                                <img
                                    src={attributes.imageURL}
                                    alt=""
                                    style={{
                                        width: '100%',
                                        height: 'auto'
                                    }}
                                />
                                <Button variant='secondary' onClick={() => {
                                    setAttributes({ imageURL: '', imageID: 0 });
                                    setImageURL('');
                                }}>Remove Image</Button>
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
                    <img
                        src={attributes.imageURL}
                        alt={attributes.imageAlt}
                        className={`bd-carousel__image`}
                        data-bd-bg-position-desktop={`${attributes.desktopPosition}`} 
                        data-bd-bg-position-tablet={`${attributes.tabletPosition}`}
                        data-bd-bg-position-mobile={`${attributes.mobilePosition}`}
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