Components in `/lib` should be entirely self-contained, and...

MUST NOT:
- Observe app state directly
- Import components from `/app`
 
 <br>
 
MAY:
- Take an observable mobx container as a prop
- Import other components from `/lib`
- Use common utils and modules from elsewhere in the app
