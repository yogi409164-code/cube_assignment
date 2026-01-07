// Counter Animation
$(document).ready(function() {
  const formatNumber = (num) => {
    if (num >= 1000) {
      const thousands = Math.floor(num / 1000);
      return thousands + 'K';
    }
    return num.toString();
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const $counter = $(entry.target);
        let start = 0;
        const end = +$counter.data('target');
        const duration = 2000; // 2 seconds
        const increment = end / (duration / 16); // 60fps

        const update = () => {
          start += increment;
          if (start < end) {
            $counter.text(formatNumber(Math.floor(start)));
            requestAnimationFrame(update);
          } else {
            $counter.text(formatNumber(end));
          }
        };

        update();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  $('.counter').each(function() {
    observer.observe(this);
  });

  // Percentage Counter Animation for Stats Banner
  const percentageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const $counter = $(entry.target);
        let start = 0;
        const end = +$counter.data('target');
        const duration = 2000; // 2 seconds
        const increment = end / (duration / 16); // 60fps

        const update = () => {
          start += increment;
          if (start < end) {
            $counter.text(Math.floor(start) + '%');
            requestAnimationFrame(update);
          } else {
            $counter.text(end + '%');
          }
        };

        update();
        percentageObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  $('.counter-percentage').each(function() {
    percentageObserver.observe(this);
  });

  // Hamburger Menu Toggle
  const $hamburger = $('.hamburger');
  const $nav = $('.nav');
  const $navActions = $('.nav-actions');

  if ($hamburger.length && $nav.length) {
    $hamburger.on('click', function() {
      $hamburger.toggleClass('active');
      $nav.toggleClass('active');
      if ($navActions.length) {
        $navActions.toggleClass('active');
      }
    });

    // Close menu when clicking outside
    $(document).on('click', function(e) {
      if (!$hamburger.is(e.target) && !$hamburger.has(e.target).length &&
          !$nav.is(e.target) && !$nav.has(e.target).length) {
        $hamburger.removeClass('active');
        $nav.removeClass('active');
        if ($navActions.length) {
          $navActions.removeClass('active');
        }
      }
    });
  }

  // Product Gallery Image Selection
  (function() {
    const $mainImage = $('#mainProductImage');
    
    if (!$mainImage.length) return;
    
    let currentIndex = 0;
    
    // Get all image sources from thumbnails
    const images = $('.thumbnail img').map(function() {
      return $(this).attr('src');
    }).get().filter(src => src);
    
    if (images.length === 0) return;
    
    // Function to update main image and active states
    function updateImage(index) {
      if (index < 0 || index >= images.length) return;
      
      currentIndex = index;
      $mainImage.attr('src', images[index]);
      
      // Update thumbnail active states
      $('.thumbnail').each(function(i) {
        $(this).toggleClass('active', i === index);
      });
      
      // Update dot active states - dots represent first 3 images (0, 1, 2)
      // If index is beyond 2, show the last dot as active
      $('.gallery-dots .dot').each(function(i) {
        if (index < 3) {
          $(this).toggleClass('active', i === index);
        } else {
          // For images beyond the first 3, show the last dot as active
          $(this).toggleClass('active', i === 2);
        }
      });
    }
    
    // Thumbnail click handlers
    $('.thumbnail').on('click', function() {
      const index = $(this).data('index') || $('.thumbnail').index(this);
      updateImage(index);
    });
    
    // Dot click handlers
    $('.gallery-dots .dot').on('click', function() {
      const index = $(this).data('index') || $('.gallery-dots .dot').index(this);
      updateImage(index);
    });
    
    // Arrow navigation
    $('.gallery-prev').on('click', function() {
      updateImage((currentIndex - 1 + images.length) % images.length);
    });
    
    $('.gallery-next').on('click', function() {
      updateImage((currentIndex + 1) % images.length);
    });
    
    // Initialize with first image
    if (images.length > 0) {
      $mainImage.attr('src', images[0]);
    }
  })();

  // Fragrance Selection
  (function() {
    function setupFragranceSelection($container) {
      const $fragranceOptions = $container.find('.fragrance-option');
      
      $fragranceOptions.on('click', function() {
        const $option = $(this);
        const $radio = $option.find('input[type="radio"]');
        
        // Remove active class from all options in this container
        $fragranceOptions.removeClass('active');
        // Add active class to clicked option
        $option.addClass('active');
        // Check the radio button
        $radio.prop('checked', true);
        // Update included bottles
        // updateIncludedBottles();
      });
    }

    // Setup both fragrance sections
    const $fragranceSection1 = $('.fragrance-section-1');
    const $fragranceSection2 = $('.fragrance-section-2');
    
    if ($fragranceSection1.length) {
      setupFragranceSelection($fragranceSection1);
    }
    
    if ($fragranceSection2.length) {
      setupFragranceSelection($fragranceSection2);
    }

    // Function to update included bottles based on selected fragrances
    // function updateIncludedBottles() {
    //   const $includedBottles = $('#includedBottles');
    //   if (!$includedBottles.length) return;

    //   const subscriptionType = $('input[name="subscription"]:checked').val();
    //   const fragrance1 = $('input[name="fragrance1"]:checked').val();
    //   const fragrance2 = $('input[name="fragrance2"]:checked').val();

    //   const fragranceImages = {
    //     'original': './assets/images/p(1).png',
    //     'lily': './assets/images/p(2).png',
    //     'rose': './assets/images/p(3).png'
    //   };

    //   $includedBottles.empty();

    //   if (subscriptionType === 'double') {
    //     // Show 2 bottles for double subscription
    //     if (fragrance1) {
    //       const $img1 = $('<img>', {
    //         src: fragranceImages[fragrance1] || './assets/images/product_1.png',
    //         alt: 'Bottle',
    //         class: 'included-bottle'
    //       });
    //       $includedBottles.append($img1);
    //     }
    //     if (fragrance2) {
    //       const $img2 = $('<img>', {
    //         src: fragranceImages[fragrance2] || './assets/images/product_1.png',
    //         alt: 'Bottle',
    //         class: 'included-bottle'
    //       });
    //       $includedBottles.append($img2);
    //     }
    //   } else {
    //     // Show 1 bottle for single subscription
    //     if (fragrance1) {
    //       const $img = $('<img>', {
    //         src: fragranceImages[fragrance1] || './assets/images/product_1.png',
    //         alt: 'Bottle',
    //         class: 'included-bottle'
    //       });
    //       $includedBottles.append($img);
    //     }
    //   }
    // }

    // Subscription type change handler
    $('input[name="subscription"]').on('change', function() {
      const subscriptionType = $(this).val();
      const $fragranceSection2 = $('.fragrance-section-2');
      const $bottleCount = $('#bottleCount');
      const $fragranceTitle1 = $('#fragranceTitle1');
      const $singleRadio = $('#singleSubscription');
      const $doubleRadio = $('#doubleSubscription');

      // Update radio button visual states
      if ($singleRadio.length && $doubleRadio.length) {
        const $singleCustom = $singleRadio.next('.subscription-radio-custom');
        const $doubleCustom = $doubleRadio.next('.subscription-radio-custom');
        
        if (subscriptionType === 'double') {
          // Show second fragrance section
          if ($fragranceSection2.length) {
            $fragranceSection2.css('display', 'block');
          }
          // Update fragrance title to "Choose Fragrance 1"
          if ($fragranceTitle1.length) {
            $fragranceTitle1.text('Choose Fragrance 1');
          }
          // Update bottle count text
          if ($bottleCount.length) {
            $bottleCount.text('2 Bottles Shipped Monthly');
          }
          // Update radio button states
          if ($doubleCustom.length) {
            $doubleCustom.css({
              'background': '#0a4d2c',
              'border-color': '#0a4d2c'
            });
          }
        } else {
          // Hide second fragrance section
          if ($fragranceSection2.length) {
            $fragranceSection2.css('display', 'none');
          }
          // Update fragrance title to "Choose Fragrance"
          if ($fragranceTitle1.length) {
            $fragranceTitle1.text('Choose Fragrance');
          }
          // Update bottle count text
          if ($bottleCount.length) {
            $bottleCount.text('1 Bottle Shipped Monthly');
          }
          // Update radio button states
          if ($doubleCustom.length) {
            $doubleCustom.css({
              'background': '#fff',
              'border-color': '#0a4d2c'
            });
          }
        }
      }
      
      // Update included bottles
      // updateIncludedBottles();
    });

    // Initialize included bottles on page load
    // updateIncludedBottles();
  })();

  // Accordion Functionality (Vanilla JavaScript)
  (function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(function(item) {
      const header = item.querySelector('.accordion-header');
      const icon = item.querySelector('.accordion-icon');
      
      if (header) {
        header.addEventListener('click', function() {
          const isActive = item.classList.contains('active');
          
          // Close all accordion items
          accordionItems.forEach(function(accItem) {
            accItem.classList.remove('active');
            const accIcon = accItem.querySelector('.accordion-icon');
            if (accIcon) {
              accIcon.setAttribute('data-feather', 'plus');
            }
          });
          
          // Open clicked item if it was closed
          if (!isActive) {
            item.classList.add('active');
            if (icon) {
              icon.setAttribute('data-feather', 'minus');
            }
          }
          
          // Re-initialize Feather icons
          feather.replace();
        });
      }
    });
  })();
});
