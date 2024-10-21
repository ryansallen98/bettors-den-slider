<?php
if (!isset($attributes['imageURL'])) {
    $attributes['imageURL'] = '';
}
if (!isset($attributes['imageAlt'])) {
    $attributes['imageAlt'] = '';
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
        <img src="<?php echo $attributes['imageURL'] ?>" alt="<?php echo $attributes['imageAlt'] ?>"
            class="bd-carousel__image" 
            data-bd-bg-position-desktop="<?php echo $attributes['desktopPosition'] ?>" 
            data-bd-bg-position-tablet="<?php echo $attributes['tabletPosition'] ?>" 
            data-bd-bg-position-mobile="<?php echo $attributes['mobilePosition'] ?>" 
            />
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