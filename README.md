# Edqart-ionic
Edqart mobile 


# EdqartWebBlueV2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

===============================================================================================================
                                                What to Do ?
===============================================================================================================

# const vs let
---------------
When declaring variables, use const when the value is not going to be reassigned.

# Naming
---------
Naming conventions are hugely important to maintainability and readability. This guide recommends naming conventions for the file name and the symbol name.

# Use directives to enhance an element
---------------------------------------
Do use attribute directives when you have presentation logic without a template.

Why? Attribute directives don't have an associated template.

Why? An element may have more than one attribute directive applied.


# Symbols and file names
------------------------
Do use consistent names for all assets named after what they represent.

Do use upper camel case for class names.

Do match the name of the symbol to the name of the file.

# Shared feature module
------------------------
Do create a feature module named SharedModule in a shared folder; for example, app/shared/shared.module.ts defines SharedModule.

Do declare components, directives, and pipes in a shared module when those items will be re-used and referenced by the components declared in other feature modules.

Consider using the name SharedModule when the contents of a shared module are referenced across the entire application.

# Lazy Loaded folders
----------------------
A distinct application feature or workflow may be lazy loaded or loaded on demand rather than when the application starts.

Do put the contents of lazy loaded features in a lazy loaded folder. A typical lazy loaded folder contains a routing component, its child components, and their related assets and modules.

# Put presentation logic in the component class
------------------------------------------------
Do put presentation logic in the component class, and not in the template.

Why? Logic will be contained in one place (the component class) instead of being spread in two places.

Why? Keeping the component's presentation logic in the class instead of the template improves testability, maintainability, and reusability.


# Services are singletons
-------------------------
Do use services as singletons within the same injector. Use them for sharing data and functionality.

Why? Services are ideal for sharing methods across a feature area or an app.

Why? Services are ideal for sharing stateful in-memory data.


# Clean up subscriptions - Prevent Memory Leaks in Angular Observable
-------------------------
When subscribing to observables, always make sure you unsubscribe from them appropriately by using operators like take, takeUntil, etc.

Why?

Failing to unsubscribe from observables will lead to unwanted memory leaks as the observable stream is left open, potentially even after a component has been destroyed / the user has navigated to another page.

# Avoid having subscriptions inside subscriptions

# Avoid any; type everything; : Always declare variables or constants with a type other than any.

# Small reusable components

# Avoid long methods

# DRY : Do not Repeat Yourself. Make sure you do not have the same code copied into different places in the codebase. Extract the repeating code and use it in place of the repeated code.

# Safe Navigation Operator (?)

# Use lint rules for Typescript and SCSS

# Utilize TypeScript

# Use TSLint

===============================================================================================================
                                                What not to do?
===============================================================================================================
# Do not write comments 
------------------------
Do not write comments about missing trailing commas, variable names starting with an underscore, missing semicolons and so on. Use a linter for that

# Do not repeat yourself. 
------------------------
Sometimes a developer might choose an approach and repeat it multiple times when submitting a Pull request(PR). Do not find all of those instances and comment the same thing under every appearance of the problem; rather, leave a generic comment describing that the approach needs to be changed across the PR related files.

# Do not disregard deadlines 
----------------------------
 sometimes the fastest solution to a problem isn’t the most neat and beautiful; but approaching deadlines and extra work pressure can create situations where minimal solutions might be acceptable if they don’t violate existing structures too much. Be careful to acknowledge such situations and maybe keep a backlog of future refactorings.

# Do not write consoles in production environment

# Remove unused code

# Avoid code comments

# Clean up imports with path aliases


