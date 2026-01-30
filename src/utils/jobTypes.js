export const jobTypes = [
      // Instagram
      "instagram_feed",
      "instagram_square",
      "instagram_story",

      // Facebook
      "facebook_feed",
      "facebook_square",

      // Twitter
      "twitter_feed",

      // Effects
      "bw",
      "blur"
];

export const IMAGE_PRESETS = {
      instagram_feed: {
            resize: { width: 1080, height: 1350 }
      },

      instagram_square: {
            resize: { width: 1080, height: 1080 }
      },

      instagram_story: {
            resize: { width: 1080, height: 1920 }
      },

      facebook_feed: {
            resize: { width: 1200, height: 630 }
      },

      facebook_square: {
            resize: { width: 1080, height: 1080 }
      },

      twitter_feed: {
            resize: { width: 1200, height: 675 }
      },

      bw: {
            grayscale: true
      },

      blur: {
            blur: 5
      }
};
