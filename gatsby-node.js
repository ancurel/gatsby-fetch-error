const path = require('path');

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const createPages = async ({ pages, gatsbyUtils }) =>
  Promise.all(
    pages.map(({ page }) =>
      gatsbyUtils.actions.createPage({
        path: page.uri,
        component: path.resolve('./src/templates/page.js'),
        context: {
          ...page.context,
          id: page.id,
        }
      })
    ),
  );


async function getPages({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPages {
      # Query all WordPress blog posts sorted by date
      allWpPage(sort: [ {title: ASC} ]) {
        edges {
          page: node {
            id
            uri
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      'There was an error loading your pages',
      graphqlResult.errors,
    );
    return;
  }

  return graphqlResult.data.allWpPage.edges;
}


/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async (gatsbyUtils) => {
  const pages = await getPages(gatsbyUtils);
  if (pages.length) await createPages({ pages, gatsbyUtils });
}

