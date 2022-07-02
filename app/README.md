# Considerations & Decisions

 - I have decided that front end app use **ReactJS** with **TypeScript**, backend api use **ExpressJS**, and **LowDB** for database layer. 
 - **ReactJS** is a popular front end development framework with strong community support. It is design for build rich user interface SPA, re-useable  components help to write clean and flexible code, and also it is easy to learn. 
 - **TypeScript** is a superset of javascript with type system. With typescript strict type checking can help write clean and maintainable code and able catch error early on compile time.
 - **ExpressJS** is lightweight prebuild **NodeJS** framework that can help creating simple, fast and reliable web server. 
 - **LowDB** is a simple local JSON database, it is a good choice that used for small programs.

# Limitations

 - In this challenge program, navigation only done in same page. But with **React Route** it is possible to create traditional navigation.
 - The search function not able to do wildcard search  (like %% in SQL)  due to limitation in **LowDB** 
 - The search function not able to search by service date as no relevant field in database, so no implementation on it.

## Design Principal and Patterns
 - **SRP** - Single responsibility. I have try to follow it split UI to separate component with single responsibility, also it applies to api functions.
 - **DI** - Dependency inversion.  I have follow to program to interface not implementation e.g. created **IMember** interface.
 - **Provider Pattern** In react I have choose **MUI** as UI framework provider, and **React Hook Form** to help with validation and data submit.
 - **Compound Components Pattern** I have make parent component to interact and share state with child components e.g. App component and child components header, search and searchresult components.
 - **Middleware Pattern** The api ExpressJS program has used some middleware e.g. **BodyParser**, **CORS**
 
## Future Improvements
 - Add unit tests to front end, test components too.
 - Project structure can be improved that group code logically into folders, so it can make program more flexible to future extension.
 - Replace better NoSQL database that support wildcard search so can make search function more powerful.
 - The search result page can have pagination that make showing more results user friendly.
 - Display search results history may have limit so that avoid too much history results.
