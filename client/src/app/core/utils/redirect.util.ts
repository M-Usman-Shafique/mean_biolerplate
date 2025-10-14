import { ActivatedRoute, Router } from "@angular/router";

function isSafeUrl(url: string): boolean {
    return url.startsWith("/") && !url.startsWith("//");
}

export function redirectToReturnUrl(
    route: ActivatedRoute,
    router: Router,
    fallbackUrl: string = "/"
): void {
    const rawUrl = route.snapshot.queryParamMap.get("returnUrl");
    const returnUrl = rawUrl && isSafeUrl(rawUrl) ? rawUrl : fallbackUrl;
    router.navigateByUrl(returnUrl);
}
