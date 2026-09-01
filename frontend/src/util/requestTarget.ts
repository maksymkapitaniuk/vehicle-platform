export type RequestTarget = 'user' | 'users' | 'vehicle' | 'vehicles';

export function toPossessive(requestTarget?: RequestTarget | undefined) {
  switch (requestTarget) {
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
