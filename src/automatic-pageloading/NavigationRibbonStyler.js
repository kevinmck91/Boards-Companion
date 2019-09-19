export { NavigationRibbonStyler }

class NavigationRibbonStyler {

    stylePrependedNavigationRibbon(navigationRibbon) {
        navigationRibbon.style.marginBottom = '50px';
        navigationRibbon.style.marginTop = '10px';
    }

    styleAppendedNavigationRibbon(navigationRibbon) {
        navigationRibbon.style.marginTop = '50px';
        navigationRibbon.style.marginBottom = '10px';
    }
}