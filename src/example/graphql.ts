
import {gql} from "@apollo/client"
// const query = gql`query Search($first:Int=20, $after:String ) { 
//     search(first:$first, after:$after,query: "virtualize", type:REPOSITORY){
//       repositoryCount
//       pageInfo{
//         hasNextPage
//         endCursor
//       }
//       nodes{      
//         ...RepoInfo
//       }
//     }
//   }
  
//   fragment RepoInfo on RepositoryInfo{  
//     nameWithOwner
//     description
//     forkCount
//     owner{
//       id
//       login
//     }
//   }`;

const query = gql`
  query PropertyFindAll(
    $where: PropertyWhereInput
    $orderBy: [PropertyOrderByInput]
    $pagination: PaginationInput
  ) {
    propertyQuery {
      id
      properties(where: $where, orderBy: $orderBy, pagination: $pagination) {
        edges {
          id
          address
          city {
            id
            alias
            name
            region {
              id
              alias
              name
            }
          }
          price
          propertyCode
        }
        pageInfo {
          currentPage
          hasNextPage
          hasPreviousPage
          pageCount
          pageSize
          rowCount
        }
      }
    }
  }
`;

  export default query;