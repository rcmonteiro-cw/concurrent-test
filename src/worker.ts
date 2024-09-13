import axios from 'axios';
import workerpool from 'workerpool';
import { heavyTask } from './task';

workerpool.worker({
  performHeavyTask: heavyTask
});