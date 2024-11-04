<?php get_header(); ?>

<main id="main" class="container mx-auto px-4 py-8">
    <header class="search-header mb-8">
        <h1 class="page-title text-3xl font-bold mb-4">
            <?php
            printf(
                /* translators: %s: search term */
                esc_html__('Search Results for: %s', 'your-theme-text-domain'),
                '<span class="text-blue-600">' . get_search_query() . '</span>'
            );
            ?>
        </h1>
    </header>

    <?php if (have_posts()) : ?>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white rounded-lg shadow-md overflow-hidden'); ?>>
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="post-thumbnail">
                            <?php the_post_thumbnail('medium', ['class' => 'w-full h-48 object-cover']); ?>
                        </div>
                    <?php endif; ?>

                    <div class="p-4">
                        <header class="entry-header">
                            <?php
                            if (is_singular()) :
                                the_title('<h1 class="entry-title text-xl font-semibold mb-2">', '</h1>');
                            else :
                                the_title('<h2 class="entry-title text-xl font-semibold mb-2"><a href="' . esc_url(get_permalink()) . '" rel="bookmark" class="hover:text-blue-600">', '</a></h2>');
                            endif;
                            ?>
                        </header>

                        <div class="entry-summary prose max-w-none mb-4">
                            <?php the_excerpt(); ?>
                        </div>

                        <footer class="entry-footer text-sm text-gray-600">
                            <?php
                            $post_type = get_post_type();
                            printf(
                                '<span class="entry-type">%s</span>',
                                esc_html(get_post_type_object($post_type)->labels->singular_name)
                            );
                            ?>
                            <span class="entry-date ml-2">
                                <?php echo get_the_date(); ?>
                            </span>
                        </footer>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>

        <?php
        the_posts_pagination(array(
            'mid_size' => 2,
            'prev_text' => __('Previous', 'your-theme-text-domain'),
            'next_text' => __('Next', 'your-theme-text-domain'),
            'class' => 'mt-8'
        ));
        ?>

    <?php else : ?>
        <div class="no-results bg-gray-50 rounded-lg p-8 text-center">
            <h2 class="text-2xl font-semibold mb-4"><?php esc_html_e('Nothing Found', 'your-theme-text-domain'); ?></h2>
            <p class="text-gray-600 mb-6"><?php esc_html_e('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'your-theme-text-domain'); ?></p>
            
            <form role="search" method="get" class="search-form max-w-md mx-auto" action="<?php echo home_url('/'); ?>">
                <div class="flex gap-2">
                    <input type="search" 
                           class="search-field flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           placeholder="<?php echo esc_attr_x('Search &hellip;', 'placeholder', 'your-theme-text-domain'); ?>" 
                           value="<?php echo get_search_query(); ?>" 
                           name="s" />
                    <button type="submit" 
                            class="search-submit px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <?php echo esc_attr_x('Search', 'submit button', 'your-theme-text-domain'); ?>
                    </button>
                </div>
            </form>
        </div>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
