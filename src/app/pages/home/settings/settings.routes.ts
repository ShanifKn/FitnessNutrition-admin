import { Route } from "@angular/router";
import { FaqComponent } from "./faq/faq.component";

export const settingRoutes: Route[] = [
    {
        path: 'faqs',
        component: FaqComponent
    }
]