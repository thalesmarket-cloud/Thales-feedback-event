
import React from 'react';
import { COLORS } from '../constants';

const Header: React.FC = () => {
  const logoSrc = "data:image/png;base64,iVBORw0KGgoAAA... (tronqué pour brièveté dans la description, voir contenu complet ci-dessous)";
  // Utilisation de la chaîne complète fournie par l'utilisateur
  const fullLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV8AAABtCAMAAAAxrpKhAAAAYFBMVEX///8AdbkItOk/l8p/uty/3O0Pfb3v9vufy+XP5fImvezf7vYfhsJfqNOi4/dvsdcvjsaPwuAXuOrB7Pmv1OlPoM+D2fRFx+7g9vxk0PFVy/CT3vXR8fuy5/h01fM2wu1cBtE5AAAKGUlEQVR4nO2d6bLbKgyASbzh2m7snqRpe7q8/1te8MoiFjkEfGesH50eB7D8RRaLBCFNgROySL1cqYlFCq9Se2VTvsJVrAuUWJSvHLfOLzhZK2bLlczW/MWrlCS/f3gX3ZQv3IVFyS4ogZWvaNeKRBwqHoXv8+ldNCXfolOJOFQ8CN+P6/Wrb9l0fJtu/dBXxYPwfV6v33y9aTK+9xIg4lDxGHyZ+V6vvzwLp+J7A4k4VDwG3yfne/3jVzgR30760FfFQ/AdzdfbQ6ThqyDzVfEQfCfzvV5/epVOwvduIuJQ8Qh8Z/Nl8uFTPAXfqlQ+tN+pyDVp16r6Z7muYki+z5XvFx8PEYAv8Ii6UKGq7HwvWW68ifvmXqUC8p3M9+/0r0f5AHxx9djAV4Rb5sh5OeLm7+A7mu8X8tfXQyTgKw7N+j10E/KdzPcrqb5MnJ2SgK/gfXfiTcf3uWCdQH93VojPVxg8lDvxJuO7mC+TyUP8dtWIz1cYblF36VduHp7vc/MKk4f456oRn+9WsUXWxN48OF/BfAn54+Uh4vPdxq43ZE3szYPzfUqd2i8fDxGfbwD3kIivZL7MQ3zjfzqW2lPyRd4RffPQfGXzXTzEp7XOydebr2K+ZPYQ36zBuJR8B2RN7M0D89WnFD/cHiI+336t2CFrYm8elu9XzXwJ+XR6iPh8H2vF3dOLoHyzRRzDmdV8f3znMo0bnq6l9t18b6teuHpk2BwEfuFslpB8PWUz358C08lDWIJxu/nulnrje9mbMpOA72a+0rzi0xGMi89XmGBcyp2A4/OFzZfJP7uHSMBXcBCX8r6rifh8DeZLyO+r1UMk4CuHhzK6o5dD8i0zH7H1b0bzJeS7dak9QP+GVl4NWLZSQerhM5B8/cRm5UbzJbOHMAXjksSPe3vZNm+8b/4uFWWxmO/iIQzBuCR8azWArElndxqx+drM1+4h0uSXqAkQutg7vsh8rea7LLXDHiJRfhR117DNniPztZuvNRiXKr/v7nQRNsBx+TrMl9iCccnyUxtHJ3exAY7L12W+tmBcwvx16jRh44g0Kl+3+Vo8RMr9ARV12bBJp6h83eZLzMG4tPtbSEO7zALZFGGOOT/2MV9zMC7B/Ngm9dBKgA0rmDH5epmvMRh3ML5EmT2XcJmIfP3Ml5iCccfjK8/u4Bh+RL6e5mvyEAfkK83uHmCJkHzBFOVVvM3XEIzbzZfq+eLBREjAhh1EvPimt/mSJRgne4gE+aluETOwwdXKaHw38/3lMl84GHdIvkKM+QKu80Tju5qvV74vEIw7Jl9XjDkW3818nYH4UfRSx+RbHIQvaL5jR2cT0UOcfC18QfP9sLJVPcQx+QojtJR8QfP95+YrLLUfk68whwOTAOPwBc33041XDMYdk6+w5AOqFYcvZL7TGMwpazBu5YtNtnsnX8H9XkC1ovCFEibRsvLFJuu/k6+w9tm/cPMX+fpuIbRK7qMCJG/kK66gwSGMGHyDmO/6LK6MDk3ex1fMTzPoFYNvEPNd+L5rCzteaikwAi+feSYfv8Q3jPnOfMc4zOBzzoCuPP58ArPQmxIseulMvZf4hjHfmS8fBA0XH9GV9xM//642un8HotTaDr6BzHfiyxMNtENFDsC33b1BQ25tB99A5jvyHYe+j4uX6Mq/j+/e7HatNTzfUOY78uW+sbj4ia782/ha8L69fwtlvpwvb7eSw+JH4Guz3nePz4KZL+fbEMQZWLryb+Lb25zDu/kGM18Glg+5xD1Th+Bb2gfkb+YbznxJ3sr6HoJveXNMJ9/MN5z5ktx/6BuJb9u5dxRth2d7lcKeD/7Bxf+MaptUsro7Djd/+XxwQWo7sFNOOeWUU0455ZRTTjnllFNOOeWUU0455ZRTTjnllGNIASSv0TyvpSJ6PJSK6W9QPK8aHjxnqXwY4lHr7x7doc+pmlNXGG7DpJG1Vds3bIQ1NddMSXr9zRATorkQBALgNblMJgeCd5mceZ0DgU4pQAiEnfItIawEN3kIOQvAcWG8+Ua9YIhu3cCzbrScCOVzuLlK2DycgV9AJmbDAvDkVKLCxFdM/oP5Cscial91xW3gQYuioDwzLANMlKfecBm/Ae1J+GXR4mrD10jm1D4dBZ1Ua+fbaLlIYHP8cIHydmd631jFEkpL9eDbi2RMfIXbw3wtMWuOd/326x78pZ610aIHEpHHULfwd2fmSxkIcyoopPsoUHMc721RNYfv6MFXqgXz7UohvRLN9yG/sR30Am+N8uwxlT9rXty0wmy0NfFtL93NvH8Iw5crIpgsBbclheGbD4JRYfkWakJGDzyM0Giuf8w0aIVG2KMOBr53dr0xbyDC8M2VlOgBsotAfLkN0rUIjm+m+sMa8ABOvoPQCmOt6r2VbPkLYzqrCcO3VFOiM2ADWyi+7JVcuh0k30b/2h+6okKjnd4/MQ2YAkszTGdq4DuZ7t04uEDwvWsbZSjwXoTiy2+XmXW08KX6sRLApa1RCpwUxjXoVvfXsQIGvnOh1qQOgm+ubUipAAcRjC8fV+ZGHbNLv2ZnKcaX68ba6HuouFPgkvOhgnbMB9egXqxnrA3zXYw8N+01Q/B96EV7HY4H30EkY+bLu9PapKM4v1DQAXoSkO8qeuc0apDNdj3Cg/kuXAGftBYArwN8M+g12sNXImPmOw6VK4OO4vyCqh+h+GYDYHmjBnRm0HJ2MN/VL3SGIRqKr3bc0z6+vUjGwncZsCD9L1C8AvmScQhkOCKBl59e/gkzyHfrgApDQwi+nV4UcOvh/C9ZBq54vkDXrD793GgL292kweTJp/cW5CuYXAsP0XD9m3KpAfYIBuXLJozs8ZF8a12rTt8rOjdawI5z0mDs2Jp1C5bGV9l4Ac0xEHx1vQfX+Kx7kS8Zp3HY+YVmk3x6qxZaGn3YZvl8YDZ7Voiv+lPlgC6Y+UWrLDSxDl4/gE968Ew3Dhxf3lkNWL656m1vgB0sjTYldArF1sPSeQQG8GWWnW05/A9wPzWGL1WmmR20M19c6wC6FSxfPo0DHL99fUdeJ+F66wjXB8+hnmnRgFnQPAID+MoOEx6iodbPMqmJHHwjxI4UGnUj+c6HTQFFLHz5Ot/GLAd3M64PXqmvpagBXV97gK/idaDVAhxfvq7az5ebDF63Zn3+8jTsMXUIWL7T1mmgiG3PEgfcjoGhirbwZtHtwe/g+u+kAV88p6De06Ka+Le+fkCQfKe4QM8DO/w/LRj8uvP9gw0PBJVQG7zD3uJDpviFoOi4uRcoYt0TNp/jkZkDLcKDZ+D62fSfbrFRnW+vdqNQd4Tjyzp07aADrVgxxhVNIxY5PpQTCvyy1U2akhXQRu+b6wcf78uRAQ9D2GFrtMky1XOuGjTZbKO1GoZitRRzHbJM77NMm9SBqNasuPLbWnqx5RAY/W6TnoLs/xFqD3FuUfzfSsOfzOv4jP8AJudpmHFFhusAAAAASUVORK5CYII=";

  return (
    <div className="text-center mb-10 w-full animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-50 flex items-center justify-center overflow-hidden">
          <img 
            src={fullLogo} 
            alt="Thalès Informatique" 
            className="max-h-16 w-auto object-contain"
          />
        </div>
      </div>
      <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Votre avis compte</h1>
      <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed text-lg font-medium">
        Merci d’avoir participé à notre Journée Portes Ouvertes. Votre retour nous aidera à améliorer nos futurs événements.
      </p>
    </div>
  );
};

export default Header;
