import {Client} from './Client';


function createClient(canvas:HTMLCanvasElement):Client {
  return new Client(canvas);
}

(<any>window).createClient = createClient;
