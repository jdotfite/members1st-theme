<?php get_header(); ?>

<main id="main">
    <div class="content-area">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header mb-4">
                    <h1 class="entry-title text-3xl font-bold">
                        <?php the_title(); ?>
                    </h1>
                </header>

                <div class="entry-content prose max-w-none">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; endif; ?>
    </div>
</main>

<?php get_footer(); ?>