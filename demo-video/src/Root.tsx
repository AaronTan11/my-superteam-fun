import { Composition } from "remotion";
import { StmyOSDemo } from "./StmyOSDemo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="StmyOSDemo"
      component={StmyOSDemo}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
