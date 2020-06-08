import {Controller, Get, QueryParams, Session} from "@tsed/common";

@Controller('/pc')
class PCController {
  @Get()
  public getSession(@Session() session: any) {
    return session.pc_no;
  }

  @Get('/set')
  public setSession(@QueryParams() params: any, @Session() session: any) {
    session.pc_no = params.pc_no;
    return true;
  }
}

export default PCController;