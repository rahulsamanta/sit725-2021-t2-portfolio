document.addEventListener('DOMContentLoaded', function () {
    let dropdownTrigger = document.querySelectorAll('.dropdown-trigger');
    let dropdownTriggerInstances = M.Dropdown.init(dropdownTrigger);   // Options: https://materializecss.com/dropdown.html

    let sidenav = document.querySelectorAll('.sidenav');
    let sidenavInstances = M.Sidenav.init(sidenav); // Options: https://materializecss.com/sidenav.html#options

    let parallax = document.querySelectorAll('.parallax');
    let parallaxInstances = M.Parallax.init(parallax);  // Options: https://materializecss.com/parallax.html#options

    let tooltipped = document.querySelectorAll('.tooltipped');
    let tooltippedInstances = M.Tooltip.init(tooltipped);   // Options: https://materializecss.com/tooltips.html#options
});