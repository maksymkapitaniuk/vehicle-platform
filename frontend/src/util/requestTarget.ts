export type RequestTarget =
  | 'admin'
  | 'user'
  | 'users'
  | 'vehicle'
  | 'vehicles';

export function toPossessive(requestTarget?: RequestTarget | undefined) {
  switch (requestTarget) {
    case 'admin':
      return 'admin';
    case 'user':
      return "user's";
    case 'users':
      return "users'";
    case 'vehicle':
      return "vehicle's";
    case 'vehicles':
      return "vehicles'";
    default:
      return '';
  }
}
