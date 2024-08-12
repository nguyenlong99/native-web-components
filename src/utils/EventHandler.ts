export default class EventHandler {
  static events: Record<string, any> = {};

  static subscribeToEvent(event: any, elem: any) {
    if (!EventHandler.events[event]) {
      EventHandler.events[event] = [];
    }
    EventHandler.events[event].push(elem);
  }

  static triggerEvent(event: any, params: any) {
    if (!EventHandler.events[event]) return;
    EventHandler.events[event].forEach((elem: any) => {
      if (elem.handleEvent) {
        elem.handleEvent(event, params);
      }
    });
  }
}
