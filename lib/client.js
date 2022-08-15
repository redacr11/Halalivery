import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url/";

export const client = sanityClient({
  projectId: "ej8n9vkp",
  dataset: "production",
  apiVersion: "2022-07-31",
  useCdn: true,
  token:
    "skg4GiWZBSymglOeIgKrcx5Cbfh2ao6MjMIzSnruw3Z51ISauF9LUzvOFMGbsA7TqMVzCQLK770diXlmdWzxGni6zRyATnsmBwpsycaUsDrcqmSMLvapLcG3dWwbHpxWT3TJnqVWKnduC9k5BvUVqVfZ2X4fEaf3DfQRrpkqwEhR32sS2A9G",
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
