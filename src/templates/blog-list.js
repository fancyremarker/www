import React from 'react';
import { Helmet } from 'react-helmet';
import AptibleLayout from '../components/layouts/AptibleLayout';
import { graphql } from 'gatsby';
import Index from '../components/blog/Index';
import Pagination from '../components/blog/Pagination';
import ZeroTo from '../components/footer/ZeroTo';

export default ({ data, pageContext }) => (
  <AptibleLayout>
    <Helmet>
      <title>Aptible | Blog</title>
      <meta name="description" content="Get the latest updates about Aptible, our security management platform, and app deployment platform." />
    </Helmet>
    <Index posts={data.posts.edges} categorySlug={pageContext.categorySlug} />
    <Pagination
      numPages={pageContext.numPages}
      currentPage={pageContext.currentPage} />
    <ZeroTo />
  </AptibleLayout>
);


export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    posts: allContentfulBlogPost(
      filter: {
        type: {
          eq: "blog"
        }
      }
      sort: { fields: [postedAt], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          type
          title
          slug
          postedAt
          category
          author {
            name
            slug
            professionalPhoto {
              file {
                url
              }
            }
          }
          secondAuthor {
            name
            slug
            professionalPhoto {
              file {
                url
              }
            }
          }
          body {
            json
          }
        }
      }
    }
  }
`;
