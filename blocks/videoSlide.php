<?php
if (!isset($attributes['videoURL'])) {
    $attributes['videoURL'] = '';
}
if (!isset($attributes['videoPoster'])) {
    $attributes['videoPoster'] = '';
}
if (!isset($attributes['desktopPosition'])) {
    $attributes['desktopPosition'] = '';
}
if (!isset($attributes['tabletPosition'])) {
    $attributes['tabletPosition'] = '';
}
if (!isset($attributes['mobilePosition'])) {
    $attributes['mobilePosition'] = '';
}
?>

<div class="bd-carousel__slide">
    <div class="bd-carousel__image-wrapper">
        <video 
            src="<?php echo $attributes['videoURL'] ?>" 
            poster="<?php echo $attributes['videoPoster'] ?>" 
            class="bd-carousel__image" 
            data-bd-bg-position-desktop="<?php echo $attributes['desktopPosition'] ?>" 
            data-bd-bg-position-tablet="<?php echo $attributes['tabletPosition'] ?>" 
            data-bd-bg-position-mobile="<?php echo $attributes['mobilePosition'] ?>" 
            autoplay 
            loop 
            muted 
            playsinline>
        </video>
        <div class="bd-carousel__cover"></div>
    </div>
    <div class="bd-carousel__container">
        <div class="bd-carousel__content">
            <div class="bd-carousel__cta">
                <?php echo $contents; ?>
            </div>
        </div>
    </div>
</div>