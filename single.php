<?php get_header(); ?>

<main id="main" class="container mx-auto px-4 py-8">
    <div class="content-area">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header mb-4">
                    <h1 class="entry-title text-3xl font-bold">
                        <?php the_title(); ?>
                    </h1>
                    <div class="entry-meta text-gray-600 text-sm">
                        <?php echo get_the_date(); ?> by <?php the_author(); ?>
                    </div>
                </header>

                <div class="entry-content prose max-w-none">
                    <?php the_content(); ?>
                </div>

                <footer class="entry-footer mt-4">
                    <?php
                    $categories = get_the_category();
                    $tags = get_the_tags();
                    if ($categories || $tags) :
                    ?>
                        <div class="taxonomy-links">
                            <?php if ($categories) : ?>
                                <div class="categories">
                                    Categories: <?php the_category(', '); ?>
                                </div>
                            <?php endif; ?>
                            <?php if ($tags) : ?>
                                <div class="tags">
                                    Tags: <?php the_tags('', ', '); ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </footer>
            </article>
        <?php endwhile; endif; ?>
    </div>
</main>

<?php get_footer(); ?>