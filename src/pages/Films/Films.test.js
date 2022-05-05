import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { server } from '../../mocks/server';
import { render, screen } from '../../test-utils/test-library-utils';
import Films from './Films';

const films = [
  {
    id: 'S0JJ633X4aiEbszUcMXQ',
    year: '2022',
    name: 'Avatar',
    description: 'Some descr',
    img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaHBwdGhwZGhoeGhwcGh4ZGhgcHBweIS4lHCErIRoaJjgmKy8xNTU1GiQ7QDs0Py40NTQBDAwMEA8QHxISHzQrJSQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0NDE0NP/AABEIALIBGgMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAADBAUGAAECB//EADwQAAIBAgQEAwUHBAEEAwEAAAECEQADBBIhMQVBUWEicYEGEzKRoRRCUrHB0fBicuHxMxUjgpIkQ6IH/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAkEQACAgIDAAIDAAMAAAAAAAAAAQIRITEDEkEyUQQiYUKB8P/aAAwDAQACEQMRAD8A8/RJpvDoZAA1Ow567UGzbJIA/nlXqHsR7JZIv4hIcaoh+7/Uw69ByrsWMs5WT/sTwMYe0C6gXX1Y7kD7qg8tN4q1xSqCmA1YTtuxxVI2zUu7Vq9iFBgsPnQi/PlTigs6zUpjsJngzBFHz1marEbw6BFCijo9LzRENJoY2DNbmgm6F3IFYt9ToGBPnWbQBprCwpbEXComOn560hi8WW8I0H506Cxs8SXkDSD8RbNIPpSN1uVDppIRKrxc81FCHFGnkRSBrgU6Ac4jjldCCDttOnnpqfKq/gMUbd3OoDQDMxz0nr8qZ4g5CGOelVrEsxMbaxAPzoYDuJ4kxZmQnUnYdd+9cWcUWBLMQ2uw3J3JPSkw0AwcsbzrQWuPPM9NIpDHMXdBAjVtdOXbSolpbQ6RyojO0nlGtL++APMmkkDBO4mBy2NbIBHrWzqdq1dJAFUI7sOFI5xr511d8YzaCI01oFpjHLWjtcMDn0oCzk2fCDMmdqLhz4tRHmK4tMD8R+W1NBiOSnnQCDYlCQfLkam/YUD3jyxDZRA5HXxDvyqKAJ36VvAYpkdWUwQd/oapAy8cX9nbF8EsmV/xpAb15N61QeN+x96zLAe8TmU3A7rv8pr1HD3MyK3UA/OuzTv7EeCPaGoig+7bq1eyca9mbOIBJXI/41/UbGqofYfE8nSOXiO3LlRQFs4F7NWMMBkXM/N2ALHy/COwqfWuFWiqKTYzpDUHxTiDSVBhdR51NsYBPQVUMY8mpWwYN7s6k+VbXFMBAJjpypea01WIZTFMDmB/arLhrwdQw5/nzqpIas/Ck/7a99aGNDlcX3IUkV2BQcVdAGXmdqTGQ166frQg/et4kaxXBoRLJPg+IJYoSSGB37UfE2wrEVGcNdg65YkmNe+9T+Pt6Zum9SxohrtciunoJMUDYQ0M1k1yaBAcRcUCG58vOobH4XxHJrMd4nvR+LOwOxOmkfWmDZFpS7uMhTTMYI0BEGevrWcnktK0Vi+GDGgjEMJ9N63j8Zb942W6jAnTxjXsJ335UFhybTlHP1q9kvBnviZAG9Y+H9DNCS4FNGe4xEARz+lPQrNCzArVwA+Vbt3oBBE6b0MP0oBm2uLGg+ldJqNq0Emu7KeHWYmgQI9zFFsDUeIfI0e2gckQNtK5tLlI6a0DGkQ5pG3n+lCnxkddaMVGwreGtqHLv8CbkmCxPwp6n5AGjskrZXVvCPQeB4gPZQAiQiyOYGwMd4qRNVD2Oxga5cJks8ZYHhCpMx0EkCO1W64QBJpp2rE0k6N1uKHZuBhp6g7iu6YjtVrgYlM+TMM3SmcsCapnELhDh1MGZ35neKlZBlr4hPu3jp9OdVG8Zq14ctcsAtu6/ntVTxaOhIYEHpTQMXFaL12gzagTpJjtXJtk6xp+1UIxDVt4X/xJ5VUraSQKu9i1lUKNgKGCNxUZxM5WDNIHUAkT3jUVLrB2rGtBhBEjpU2vR5KJieJIAzsQuUkRIkxtA70HAYq5dOYpkQbT8Tf4qeu+xlprhufAR8KpGXTmZB18orVnhzhZgnxRrv5+VXcfCc+jHA7BZ80aLr68hViu28ykdaSlbCwBM/zejYTF5wdIisnbyUiDewxcrsRP0pQ1a2UdKrWJSHYHTUn0O1VYAxXLV0TSmN4ilpGcwSNgfhzaFQxkb6KB/WDoNaTdDSt0RfGuMvaICqhDZlGeQVZcxzk7FBkaY5dTpVY+xfaMr4rG5QVzKixnyn4PDJyllAYrGgI13AjOOcTV715s7upkprpmYgkgDYROpPPWow8Qclcg+EQGECRr8TaTuddd6zWf6avGCxP7P4BtBi3B2GbIUMaHKWUBo5weYoScOv2lhWXEWR95D40HdRmOXsCY7VDW7d0IWylkBkhbiSCfvQo08tqzBYls4Nu6yPyzDXN+EkGPLrVu1tURSaw7Juw6sM2/boadttpp6VBvxAoTmVDcc+LJ8Ej75AglzOsEDrrRcNiSXDF9ARzgRudNtqlyp16VHi7RcrSSJJl1rtEHSZ/mtCa+G1G07zP1puwpqzEE6+Ich2/KjJEbx25zQ3Txak/tQ713KZAoAOrQ43rpzrp1qOfESSa4a50JoHZM4PxuEUiTOp2UDVmJ5AAE0h7R4pHdLKEhAfJoGrMf6mj00GwqRvJ9mslf/teM/Uc1t+m57/21XlWWk6kDfz3/ACFY32ljSNvjH+lw9m8QiOjKSqqIYiTp071YfaXjBCIttv8AkB8WoIGkR08687wuNZPhP+6bxPGLlxVDRKyc3MzH7V0owL37Pca94xtsApA06tGjE/znU/75PxL8xXl3s9imTEW2Y7tEdn0/WvRTxNRpl20+VAWVt/au7cUKYU88oIkfM0neuBjP8mq77wg6n5RTScQiJEg/OpTQqL1wrijLh2BYZkMLO+UjpziueH8QRyy3jm1kEidxr9agcFdU5c0wTWkAV2HLl5ULY/C1YJbclbTeIz4WHhf9vOu8XftqoTJFzlb2ZgNWKnnpOtVtGIMgweUbg1vjmfE2AjMFdGDI4mZgiCQZGh3HQU6yJt0T54UiOH1I0KqNWY89KcuK7Ee9dbaHZVPjP9z8vJfnUN7NocMje9vLeYxlYMxfKAAFhthoT6mh43FNdDEiCD15RtSewWS02MTanIrLpoBOtOxXmVzEqgDM0EHTr6U0vt4wEBQxHM6T5xQ+NvQ1KtnoRpa/fUDVgNe3615tj/bHEMNHyf2AD6mTVdxPEXeSzu0mTmJietC462xOTej03F8XsLPvLwb8IGrfSoi/7a2ra5baMx6sQPWNa8/dy0QTQntmKbodFsx3txfcQjC2P6QCx9T+lQT4+5caWdnPOWOvnUSV70a3iguwmpbK6j7K45x/5VFcZ4g7OiMxJVkCrplhcxM/iJLzJ6nbamhjZHi+VKDCG866Gcw1QSZZgJJ5DXflJ5mpeRxbQPFcMuXLzu7Zpg5sqrm6Equg2j0qPNjxkAqIB8TfDm6TBjernxV7dt7iq6QrEDxAzlEcuelQtu0joGT4iZ9eZrVQXWkzNzd2wdvBXCwZCpA55cuh3Gghge4FccV4aILKIcCRHbWO9cYvGuvhDeorhA7CSYqklVbJ/ZOwWHw6NluPcQKeU+IaaiPPWameGYNbozJcGQNlgDxmCQZB2B6iDVTRQrODvr8qnfY68D722dGILoZ20PpE5T89+XNPWDqiWnC4VLPwPlVviQ+IN31+Fu9GdwuuZfI1E4i7LZtpGsfi2JHnE+tH99KxlWeu5pJsho6xF1RE5T10E+WlBuBG1Bjt0rayNSRqZ/gjSt++MmDPUf7p2wpArWCzzlIJH82qSwOAFke+uAZpi0p5t+M9l5dx2rXCxncs0BEEuSBovQf1HYf4rb4sXbhYxkUABRsAIyoB00k+g61nOUvivS4xSyyLxZa42Yt5fvHU0kinfr+XL6RVgxN1MrQFzEQsSDmPhUx5kUZ8GrIAoAUAAbctAKuH64JkryVia6D7a1IYjCqNDudo1pd+HONcsg7dflWqkZ9WE4bdVbiM5IAYGRqRBkVcW9rBJhQRyPWqCVjcQe9b94etOxG8ZiikGRrOh5R1omAsto7GZ1HQenKluF4Qu+e9ooXSRzHRRvPpUyiGpyDwOYa4dAOWo86ezknNzJ1pG2mWIppGkRTQEnNbDiDyNL4USh6g/SiMkdCRuJ1HMTQ2NIYw7SwB+u3rSeO4qFzrbIaOffsOdY40OYyNNBsD5c6hsfiUtEkBZ3gTJ6c/OocilGhDKLrQXIY/j/KlXwxB8JmPTbfSiENdJyrvrmJ9a4Np10meWh0+dUpsOoG656UPP10BqRsWE+/cVegHiPz2FBv+63EsecmhyDqB+1ADQT+VAe67eVckgnwimUsONco0PPb1o7BQp7omu0wxPOKZdSBrkneQT+lcNeA2nz0osLZpcEevnVm9kkVPfLu7ooSeoJIiNtcpntVZTEGRpPancDi2S6jxl1gmdgdD8pn0pWGSJx/D8PavvbzteCGAVEmR8UxvrI06U19rTZVK6aSCKA+DKxLQo0M82iX056zrWYllCxnBjlWsbSMJOxS8k7an8qPhbYjxGo65i42+dJNfJOlPukUotoZ4tYCorj737UHguM93cV4kQyETGjA5T2g6+lFxwLWJ5Kw/aoqy247TvzGorHlWTo4/iX7DWC0kzA1iZAHWTBG+3epDD2VZTt6mKW4dcRraFWgHKWBI3IGfwzJAI321rh7AVypkRI20IB3rKLsqSokTgurLl6gzTtjhSEwCfENMpEk1W3zKdDp2qWtXWs2S7Mc7r4ZPwWz97zbl2/uok+qsIq2dY9izDC4Y5gCSzH7zfedoHwqNB+5pVuAXgNHDAaGJB6nUiluH417OZlMM+5gEwNhUgePuR4oPlpShFrL2wlJPBHm0QQqqZEsdNdNNT5kH0rPtTZcpMGjWuI+MuNIAXXoJJP8A+vpSuOxTsc0AgdNPmDVohh8Jiip18Sim7nFdQQP8/KoVEuOZhV8/2otq0VJLST1/bpTYiVdy8FwNe35Gt/YrPf5j9qQF6DI8J/mtMfb7vUfJf2pWwGii+RoqMK17sHY0vjw1pVY/e0AB120J6Vq5JLJkotklZWTpsaaW2Ikajt26nlVK+2O/hmOgGh8z2qRa6yWgTcCsdAAJJ7b6Vk5M1jH7LEt8qCoKyfupGoHLXc1CYrGqMytzOnaNgR51H4fHOBJkEbHn8qCUZ5MyZ1nee1TlsZIo7uhCvvJjXWlLeEeQXjQ7xPz6/OjjFe7USNNunypG5dzt8RC9v161WhE06Ki/EpIE5dhH9q/qahMTc8UkmTyGgHYCiWXcuBkVu5kQDtI5+VN3uDuRLOD/AGrlA8ydadJARYZdsvzrm43Ib8450ycEZy6nWK3iwgGX747UWMRVqYR3gklo5wfpRrfCrxAYIQDrJgfSpPDcAZll2Kk8hTpitEXbKZZK9tTQ72KQQMhjlHX9fpVnThFoIFKSeZO/zoyYNAVYKNJjpJ5x171SiS2VqxhL7wEt5QfvPA+lHxPC7iTmBPUgTvVutWZIP8PnTlxRHSadC7MpWK4DevIhtkTGquYknmDB+sVVONcNv2XyXVgxOjAiPMV6dxDjVrDsmf4C2VmXUJ0zR8qjvbBEuG24gqwgGd51HpFDVk6VnmK2Cd6KlvkKdu24YjoSPlQwI5UoxH2bOr1s+7ZQfu7TzH+ar4arNbKkkEHaq9irJRiOXLp1p8scJmnC9osPALK3EY5yj24ykMdQSRtz0+keRkwMQAFcBwNMw+L1E6+lVz2exnu7oJEqdCJgEd9QOm+lXt0zuqpPigDYDz00gD8qxjhsuejXBMDmJe5qluCQRAY7qgH59vMULiGIN52Y7TrHM8h5D+bU1xjFqoFm3OUc+bH7zmDrP7DTSou3cy6CdOlQk5yvxDbUVRhQnStvZ010inLGMUfGB8taLxBkdAFYeIhT5HVtOfhBrVszWSLt4fwjqdfU6xQmttUobbfgB/qnT5RXD4VokjTtQArhsQA0sAY6inL18OQAqjUaAUk1vpWKsa6zRQDt7DGQAJms+wP3+YrmxxFlALCY2PMU/wD9ZTvSGN2kFtAAPExALGCY6AbCl+I4XwguxPXyP0rjHY9UGVzOgIURM9+lQGL4i9xpdiANkXbtzqbvI/AeJKo3/bkjqd6XW5LGSSeRA1rsNI1XN0A3+lSODwq5M7LlfxRJGVo6CJB896aVisXt4UsNZpxOHIRMlSOYmZ9NKXbHuWEgQIgAVrEcT1Iyc+vKkmBj4RjOrMB1j8q7sWBIA8R6Aa0QYhDEtkHOJP0NPYXFzPuLYEDV3P8APpVZYYGRhW8AGUQZYvAjSusZxVE8CrnbQlgBE8wBSdzAX7mj3IWTIExvUrZwyoAABA7UdG9i7JaI7DWWdizAop131/wKYt8It585Mkfd0jtM6mmnNRGIuX0uDJlfNtOkAbzGwrVRSRDbZZU1rGcgeFc3qKh7GDuOwN65C8kSQD2J3I7VMZ4oEIX79ydLR+YNbtXLp3sGP7wPoaeV5rr7QikKzQTsDpPlQAJMU2xtXF7+Ej6GaYxF9HGsqNPiDL+YrEvpuWAHcijXGYgFVnuTE96AKl7RY7Kr2sqFHTQrl7htJ3nLt1pLHKEwqICZBR0DCGyOmwgkESNx5HUGrTxTgP2lcjZQeWVJaY5GarXtX7M4nDIr3LiOxUqyoDoBlVGbNoWIXUiN423VtMEk0Vi/clietBa8Inl15UK5qSQoHQQR8hJ7b1z7l2O0fzl0pW/EOorYwMXqPDMjUaZvy8P5+VdDgV24FCeNyQFWPESToJ6nQa9K7w2GykV6BgicKlm6uHzMVze9JO7DZVnKIBiYmZrVRtftsXetFCxvsZirOuVLjL8S2mzMvUFYGb/xmrZhr5tYdHuDLcdBmH3lWBvP3mgEz1qWbia3TnE5ufX60PE4VL8FpVxqGGx6Zhz/AMelZz4G1hjXOryitAsSXI1P07UazlEk69q3icO6vkKQORmcw5lY/wB0Jny7x5GPyoUVFUJtydm8Vl+6IpAk5tOQn56D8j86O75uc+VLYd3ElY8RO4B0HhHppPrQNDtvGuNCZFP4biQOjbdI/WoUhtpUeQNdWWy8586GrC6J1mRjvE9dqUuYUzO4qON07imbWOjQ6flU9WX2R06cq1l/kV3ediJUr6/vS/vn/APmaKAQvtPiDSSZJmSa64cgZxm2mlcEcpOXUd+nWpG7iMsFdefKB51imMlsThUtsXYgT8IG/kB1pHFcWBUBQQR90gjakzjPeEOwkqIAO3nFLO4iQRudt6Tk7EcW77F8xP7UxdMn66UvYw7O4C6Sf4Kt/CuFBBLasevKtIxsTlRFYDhjuk5QJnU76djUvh+FPkytceDEqIg/PUVKpaNMJbrZRohysQS0UAVWMAQJ1/zREJjXej3LdB93FArOWFYiUXLIrEFUDOzprWzJrv3RO1DV2U5WUk8oEg+vL1qQQxZWKHibYfwsuYeVAxLGBqM+8Dl6c6PgMHdvTkQmN3kBfRuvahsKsHh0S2QDbCnkwWR8+Rqw8MwrXQG2T8R29OtF4Fwe2igXnDsDoCZUdv6vXTtVlLLECCByH7VDkaxheyOwYVTltr5sdz5dKr/tpaz23nXSflEVa3vqqmI8qrXHEY2XZuYOn5U4fIXJ8aR47dtwTW0taUVjLHzNNYWxnkHSutRVnK2dcKwmd0TfMyr/AOxAP51McbxmJDm3dTIiaIqxlRfugR2oOBZLAa7OtseCdi5nIT2EE+YFV3/qLl2ZmJY6k8zO81MpJSDLiSJvkGZ8XyzDrPXtUpgb3NSR1G484O3pVeTFhtG0J5x4T5gbU5hrpBkEHrBn1qk7IaaLehDrDBWHMEfpUDjOA5DNsAg8uY7TzpjD4sjankxSmATqeVEoJ7GpNaKljMKUUsUKmNDBEnYD5xXKLlAA5ACpzHYvK6W2+HNm0G6pqPUPk+Vc4jBo4lBB6xofMVm+P6NlPGSEc0Eimr9sqYYQRQXrJ4LR09ogAmIOu9CC1nlWBopMY1ZvFAdjI50L7X2pK6560DWotlJHOIuAZQIlh4gu41+hrLVqZk5QNl3PmT1otiyqjMdS3Pn603hcKCCx2Gkc/wDNZpWW3QjibTmSpYrykD9BSzyDB0NWtFy2yB4hpyGgBqN4vhS5z6D4j00mAKBKQjgMSEdHM5QY6/SvQregB3WNxuPSvOcDhmcjKCQDJGk96veHvwigduXyETtVxlREtkjbxifiH6/KmrVwH/II/Ool8VkjTfkN6aFxoBAPlVqRFD5jnXD5SdBQjcJXpSxuR3im3kESEKBHOuEyxn6b/rSQuTrTrYEOp1IkQYP6U0wo1jcXkKImr3D4egX7zHsBUgEgAHWKS4ZwlbTE5md2Hxvq0CPDPIVJt0HOgYsuFRpe54UTUmd9/COdQvFfa9vgteBF0ULAAG2wrPa/iIA90p23jmaodzECdta1jFbZDk9Iv/svxMvcOc6j+TVtxHFVtqWG45/oOtefeybhQ7k+KAAOp1qdvIWALnXkByqZRTkEZtIcbjeua5Pl+lLcQ9oxcQoBlDaa0ivDVOpzeZrnEPZQQqg/n86uMY2Q5yoicBwZ30CTJOsgb+dExvDHtPkkdTAmdP0qVwXEmA0EDtpQuK4vwqCss5y21BhnZvCFzbqpmJGskaiNSfI4ZYcfH3dIhMRb942RmPu7Sh7pgAEkeFVIPM6eQPaqocSc5ULoScoHIch3q5cZZbNn3WbM2rXHmc7/AHjPMDRR2qme52c7k1wxlKcnL6O2UYpKIwNZisS5Gv1FFwyBlM75t+dcXLRGm9dK7JWcskk2hnDY9gfC7DzMj600eIPuwVo5jQ/sahZii2b0eXStI8l7IcSxK4vJC/ENU6zpK+u3yoGDxbbS0jQgiNelR9nFKGzAwP16/pT1y4zgsolxusSXA6dW/OtbQv4P4hPeLlOh5GdqhW0JBmRv51pOIEhSFfU6Fsqr8y3b/dE+0ByfC4YES2VjbgjTUqCpnTXQ1lydWrRpFNbADUxRXwp5mJ+lNWrUf6/k1hmfiEcwBXPZrQi+GI56UL3ZqTVwdNu3Wusnn/PSlYqIFL6qJ37VJ4W8sHTyHnrUcl+yVylD5jnR7ZtrqtwieRWZ7EjapWCmyZYAoN5mByJ7VpLIOhGmx6GkxcchWE5ZjTlAlj/OtMXMYloDOTrtA1MdqbQh3D2VSVSFB6d6ZVsoAJkHT9vrUNa4lnJNtCFHNtO0CncTiMiJcY+A6EH8UToOY704pE5DXBBmepHQj9Kcwl0ssz5fwVF2HW6WUElRqCNQT0A6T86aBYbvEclUD8v0o/oyZWSNYAHUgVllEZozqsdQ0fOIqGN8DyrdjGEGAfDzP5elOwJzH28iFkZGIgxy3566edC4Vx62wbO6IV3BYc5iJioniGOLKVHizRKzCnpmI5DeO1RuB4BbDl3bONCF1A7yefSqsWD0D7WIlSCOs/l1rh78AvzAJ1qHwmICqEnRRA8hsKO+LUI8g6ggBVJJPkBTVeid6RSeK44u7EjnvUG93XpUhjb8k7840ioq6x1q5SXgRg14Xr2Nso85mJCgE67nXeru7IBoBA5n9Aa8z9h+KJbDqxEyIJPh3OpPTWrLjPaFHGVSD3G3pT+RDfWyQx3FV2FRBL3myWkzOQTEgaDcksQAPM0ph1Nx1RNWcgKOpNTY4nawTNZ92Wdhle4x1OxIURos+p0ntb/XRCXZ29AMDwy6pLX4REBZmDIwgcgVJE+f1rAQP/ludACtkNlPibR7nh2iSgA/CxqMx3Frthve2jmsneN17MOnfbyog9obGJAW8mwgFDBHkPhPqK5+aEpvDOji5YwWv9lZ4zjC7RIPWP385pK4/gIqU4pwpM+bDu1yZJQgZ1A56fEPQetQlxtKUI9I0xykpStDeFxJAIneh3nJ+9PrSK3CBGnWefzrLrd6uM6jQnH9gdy6Qd6PZxAYd+n6ikLjmmsDY1zE6ATA310Hnzqct4LcVQ5baD2qTw+LAjWIOhG4P6ioouJI6cuh6GurbRVRnTowcSV4lwpbre8t5c27rqQerKJ9SOfnvBTlJVLkE6EGAjDoeRnv1qdwd6GUyQeRG/8AmpJsFaug5kUPvI0Vp5/0nzrR8fbKHHl64kR2DxYKKGcFtmiN9QB3OnrvTQtnl6mKhsRwjK/hJQ7AMIUkbAn7p7600OIqje7cMNfiMZddiTy1kHTlXNKLi6ZskpK4jTK5OoEVrP3b50y76A8+23auM5/CPnQSVVxA0olu2YB/OhuTAB2FM4ZWJXN8I1y9fP8Aaoo08JbE8URbKIts6JDMWMlzqdvu9q4wdg4gl3MlQAFJ1bq2vxa8qTtXAzZXGbMTrGg17VJkxosEbGOQqu1ka0PsCFAII8xGnlQ2hlyN4ljY9v8AdL/aDkidI25DvWrRIEz/AKoFkOzhGUgALMEDTyNNvc777VEYi58+45dq1exEousaietMdDTsSxI5aec70S1iOX6DQd6US+Nxpp6VyXzGTp2+opWFEthDvm29Ka94ZkR6/wCKg0uka1JcGx6o0MpuOwb3aL8TPGg7DvHSjtSCMbdAsRxmyjZXeeuUEx5kUzxDG2gAhxCS0Qlu6iqAdzcuLMQJOXYwNyRVO4hee7ltiHaWZmQeE65SQ33gCD4tunOrT7M8Kw74clwA+flExAABmqgpSLn1hrJX8c9sEi27PGxX3kGN5mInbSdp50g+KzDb0zMdfUVc8VglScsDTTvVGxNuGnqT+eo+c1c49fdk8U1O68ObF/I+jaHepfDXANKgbiydPlU17NYJ8RdSym7HU75VGrMewHzMDnUxlWBcsLVnoHsyrYfDPjghdpKWpGijZ3+cr6HrUVxLigxM+8ARzswEa9xUjx/2gyRhrSlbVtQgEmdNNetVfFoXOa2fGN1Y/F5HrWq+zmf0gSYq7ZbK4if/AFYdjsaDi8HANy1AG5XkP7enlR7eKJHu7i6c1bl3HTzFK45cmitKnb8Q8+tLz/rQ47FziDmDSZilrhmtkaUJ3rI1SODpQnatuaEwpGtZOM1bUnka0FrsLSZYbCmKdC9dqjrQJYnoCfSP3ipNXzfp5DQUR+jLkXoSzdgzyFSWExpUmOcSKiyOdaS4RM1vCdGLimXFbiX7eVtDsCeXTzqu4y1ctsbb6Tqrbq0eehMRPPnpvQcNiGUSp06GpzBcSS8vu7igyNjsY6Hka0lFTjQo3B2iJwGKEMsx2iQDzgDWD69Y1OXP+oH+Zf3ouO4GVOe2ZUdfiHYxv1B9O9IfbF5oCeZg6nnXDOMouqOldZZFLXx+lPrvWVlVHQgGD+L0NSSfrWVlC2J7Om+H1FMps3lWVlN6H4CPwHyakH+AeYrKymKJpeXrW8Pq+uuprKygb0StzYUDBbYtvvCw0HmPCux5bn5msrKXgR2EwP8Aw3O2DMdtbW3T4m+Z60t7PsY3rVZW34+hc5M4n9KqPE+f95/Jaysq+f4mX43yYvgxN1AdRO1euf8A86sqOHlgoDEGSAATodzzrKyuWO0dHL6VDiX/ACP5mkH2rdZWv+RwneO/40PORrz586icT8XpWVlVybLgBNBesrKRqgTUNqysrNmoMV0ayspDYXD/ABf+P6inLO9ZWULZM/iHO9Cv7VlZVIwWwlr4azDbmsrK3gP7LbgfifyFRly0snwjc8hWVlY/mbQoen//2Q==',
    isFavorite: true,
  },
  {
    id: 'MGXuDQi1xg5ndJHF6NXO',
    description: '',
    img: 'https://www.film.ru/sites/default/files/styles/thumb_1024x450/public/filefield_paths/fantasies_7.jpg',
    year: '2001',
    name: 'Fantasies for olders',
    genre: 'RomCom',
    isFavorite: false,
  },
  {
    id: 'dSHi9Kv9wPGoAfAinZny',
    genre: 'Anime',
    name: 'Finch',
    year: '2021',
    description: 'Финч (2021)',
    img: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4774061/301e49c0-d404-4fb6-b73d-a962f19b6349/600x900',
    isFavorite: true,
  },
  {
    id: 'fMXoAlNrr5cMll1TeWiK',
    img: 'https://scontent-iev1-1.xx.fbcdn.net/v/t1.6435-9/p180x540/98310531_105613404500749_4967628761613729792_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=e3f864&_nc_ohc=0xnlDZBosoMAX-_pc1T&_nc_ht=scontent-iev1-1.xx&oh=00_AT_qZKU-EsyownjO42WLcHz11oGgQtmRakOa2Su-InQnQg&oe=62213834',
    description: '',
    year: 1998,
    genre: 'Anime',
    name: 'Futurama',
    isFavorite: false,
  },
  {
    id: 'Eo6lVYIgsKTKd8fmQHUF',
    description: '',
    name: 'God Father',
    year: 1995,
    img: 'https://ixbt.online/live/topics/preview/00/01/73/85/f08faf1005.jpg',
    genre: 'Detective',
    isFavorite: false,
  },
];

test('display image for each film from server', async () => {
  server.resetHandlers(
    rest.get('http://localhost:5000/api/films', (req, res, ctx) =>
      res(
        ctx.json({
          data: films,
          page: 1,
          pages: 5,
        }),
      ),
    ),
  );

  render(
    <MemoryRouter initialEntries={['/films']}>
      <Films />
    </MemoryRouter>,
  );

  const filmImages = await screen.findAllByRole('img');

  //expect(filmImages).toHaveLength(5);
});
