// Mocked decorator to allow typescript to compile
function Component(target: any) {
  return function(target: any) {};
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      .h1 {
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
      }

      .section {
        padding: 4em;
        background: papayawhip;
      }
    `,
  ],
})
export class AppComponent {
  title = 'fabulous-test';
}
