import { CardDescription, CardHeader, CardTitle } from "./card"

const PageSubHeading=({title,description})=>{
    return(
          <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
    )
}
export default PageSubHeading