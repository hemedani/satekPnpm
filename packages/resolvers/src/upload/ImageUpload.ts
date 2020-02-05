import gql from "graphql-tag";

export const GQL_IMAGE_UPLOAD = gql`
  mutation imageUpload($image: Upload!) {
    imageUpload(image: $image) {
      url
    }
  }
`;
