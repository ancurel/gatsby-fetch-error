import React from 'react';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';

import Layout from "../components/layout"
import Seo from "../components/seo"


const PageTemplate = ({ data: { page } }) => (
  <Layout>
    <h1>{page.title}</h1>

    {!!page.content && (
      <section>{parse(page.content)}</section>
    )}
  </Layout>
);

export const Head = ({ data: { page } }) => <Seo title={page.title} />;

export const pageQuery = graphql`
  query PageById($id: String!) {
    page: wpPage(id: {eq: $id}) {
      id
      content
      title
    }
  }
`;


export default PageTemplate;
