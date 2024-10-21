import { Route } from "@angular/router";
import { CategoriesComponent } from "./categories/categories.component";
import { BannersComponent } from "./banners/banners.component";

export const catalogueRoutes: Route[] = [
    {
        path: 'banners',
        component: BannersComponent
    },
    {
        path: 'category',
        component: CategoriesComponent
    }
]