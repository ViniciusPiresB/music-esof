import { Test, TestingModule } from "@nestjs/testing";
import { MusicController } from "./user.controller";
import { MusicService } from "./user.service";

describe("MusicController", () => {
  let controller: MusicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicController],
      providers: [MusicService]
    }).compile();

    controller = module.get<MusicController>(MusicController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
